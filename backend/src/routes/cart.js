import { Router } from 'express';
import { z } from 'zod';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

const addSchema = z.object({
  productSlug: z.string().min(1),
  size: z.string().min(1),
  qty: z.coerce.number().int().positive().max(99),
});

const updateSchema = z.object({
  qty: z.coerce.number().int().positive().max(99),
});

const serializeCartItem = (row) => ({
  id: row.id,
  productSlug: row.slug,
  name: row.name,
  price: row.price,
  image: row.image,
  size: row.size,
  qty: row.qty,
});

const fetchCart = (userId) => {
  const rows = db
    .prepare(
      `
      SELECT ci.id, ci.size, ci.qty, p.slug, p.name, p.price, p.image
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.user_id = ?
      ORDER BY ci.updated_at DESC
    `
    )
    .all(userId);
  return rows.map(serializeCartItem);
};

router.get('/', requireAuth, (req, res) => {
  res.json({ items: fetchCart(req.user.id) });
});

router.post('/', requireAuth, validateBody(addSchema), (req, res) => {
  const { productSlug, size, qty } = req.validatedBody;
  const product = db.prepare('SELECT id FROM products WHERE slug = ?').get(productSlug);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existing = db
    .prepare('SELECT id FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ?')
    .get(req.user.id, product.id, size);

  if (existing) {
    db.prepare('UPDATE cart_items SET qty = qty + ? WHERE id = ?').run(qty, existing.id);
  } else {
    db.prepare('INSERT INTO cart_items (user_id, product_id, size, qty) VALUES (?, ?, ?, ?)').run(
      req.user.id,
      product.id,
      size,
      qty
    );
  }

  res.status(201).json({ items: fetchCart(req.user.id) });
});

router.patch('/:itemId', requireAuth, validateBody(updateSchema), (req, res) => {
  const item = db.prepare('SELECT id, user_id FROM cart_items WHERE id = ?').get(req.params.itemId);
  if (!item || item.user_id !== req.user.id) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  db.prepare('UPDATE cart_items SET qty = ? WHERE id = ?').run(req.validatedBody.qty, item.id);
  res.json({ items: fetchCart(req.user.id) });
});

router.delete('/:itemId', requireAuth, (req, res) => {
  const item = db.prepare('SELECT id, user_id FROM cart_items WHERE id = ?').get(req.params.itemId);
  if (!item || item.user_id !== req.user.id) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  db.prepare('DELETE FROM cart_items WHERE id = ?').run(item.id);
  res.json({ items: fetchCart(req.user.id) });
});

router.delete('/', requireAuth, (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
  res.json({ items: [] });
});

export default router;

