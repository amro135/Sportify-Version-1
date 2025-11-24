import { Router } from 'express';
import { z } from 'zod';
import db from '../db.js';
import { config } from '../config.js';
import { validateBody } from '../middleware/validate.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { generateOrderNumber } from '../utils/orderNumber.js';

const router = Router();

const orderItemSchema = z.object({
  productSlug: z.string().min(1),
  size: z.string().min(1),
  qty: z.coerce.number().int().positive().max(99),
});

const orderSchema = z
  .object({
    items: z.array(orderItemSchema).min(1),
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    address: z.string().min(3),
    city: z.string().min(2),
    zip: z.string().min(3),
    notes: z.string().max(500).optional(),
    paymentMethod: z.enum(['card', 'cod']),
    cardLast4: z
      .string()
      .regex(/^\d{4}$/)
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'card' && !data.cardLast4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cardLast4'],
        message: 'cardLast4 is required for card payments',
      });
    }
  });

const fetchOrderItems = (orderId) =>
  db
    .prepare(
      `
      SELECT oi.id, oi.size, oi.qty, oi.price, p.slug, p.name, p.image
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = ?
    `
    )
    .all(orderId);

const serializeOrder = (order) => ({
  ...order,
  items: fetchOrderItems(order.id),
});

router.post('/', optionalAuth, validateBody(orderSchema), (req, res) => {
  const payload = req.validatedBody;
  const slugs = [...new Set(payload.items.map((item) => item.productSlug))];

  const placeholders = slugs.map(() => '?').join(',');
  const products = db
    .prepare(`SELECT id, slug, price, name, image FROM products WHERE slug IN (${placeholders})`)
    .all(...slugs);

  if (products.length !== slugs.length) {
    return res.status(400).json({ message: 'One or more products could not be found' });
  }

  const productMap = new Map(products.map((p) => [p.slug, p]));
  const lineItems = payload.items.map((item) => {
    const product = productMap.get(item.productSlug);
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size: item.size,
      qty: item.qty,
      price: product.price,
      image: product.image,
    };
  });

  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = lineItems.length ? config.shippingFlat : 0;
  const tax = Number((subtotal * config.taxRate).toFixed(2));
  const total = subtotal + shipping + tax;
  const orderNumber = generateOrderNumber();

  const transaction = db.transaction(() => {
    const orderResult = db
      .prepare(
        `
        INSERT INTO orders
        (order_number, user_id, full_name, email, phone, address, city, zip, notes, payment_method, subtotal, shipping, tax, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .run(
        orderNumber,
        req.user?.id || null,
        payload.fullName,
        payload.email,
        payload.phone,
        payload.address,
        payload.city,
        payload.zip,
        payload.notes || null,
        payload.paymentMethod,
        subtotal,
        shipping,
        tax,
        total
      );

    const orderId = orderResult.lastInsertRowid;
    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, size, qty, price) VALUES (?, ?, ?, ?, ?)'
    );

    lineItems.forEach((item) => {
      insertItem.run(orderId, item.productId, item.size, item.qty, item.price);
    });

    if (req.user?.id) {
      db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
    }

    return orderId;
  });

  const orderId = transaction();
  const order = db
    .prepare(
      `SELECT id, order_number as orderNumber, total, subtotal, shipping, tax, payment_method as paymentMethod, created_at
       FROM orders WHERE id = ?`
    )
    .get(orderId);

  res.status(201).json({
    orderNumber: order.orderNumber,
    totals: {
      subtotal,
      shipping,
      tax,
      total,
    },
    items: lineItems,
    createdAt: order.created_at,
  });
});

router.get('/', requireAuth, (req, res) => {
  const orders = db
    .prepare(
      `
      SELECT id, order_number as orderNumber, total, subtotal, shipping, tax, payment_method as paymentMethod, created_at
      FROM orders WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `
    )
    .all(req.user.id)
    .map(serializeOrder);
  res.json({ orders });
});

router.get('/:orderNumber', requireAuth, (req, res) => {
  const order = db
    .prepare(
      `
      SELECT id, order_number as orderNumber, total, subtotal, shipping, tax, payment_method as paymentMethod,
             full_name as fullName, email, phone, address, city, zip, notes, created_at
      FROM orders WHERE order_number = ? AND user_id = ?
    `
    )
    .get(req.params.orderNumber, req.user.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({ order: serializeOrder(order) });
});

export default router;

