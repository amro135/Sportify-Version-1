import { Router } from 'express';
import { z } from 'zod';
import db from '../db.js';
import { validateQuery } from '../middleware/validate.js';

const router = Router();

const listQuery = z.object({
  category: z.enum(['men', 'women', 'kids']).optional(),
  search: z.string().optional(),
  limit: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number(val))
    .optional(),
  offset: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number(val))
    .optional(),
});

const serializeProduct = (row) => ({
  ...row,
  sizes: JSON.parse(row.sizes || '[]'),
});

router.get('/', validateQuery(listQuery), (req, res) => {
  const { category, search, limit = 50, offset = 0 } = {
    ...{ limit: undefined, offset: undefined },
    ...req.validatedQuery,
  };

  let query = 'SELECT slug, name, category, price, image, description, sizes FROM products';
  const params = [];
  const where = [];

  if (category) {
    where.push('category = ?');
    params.push(category);
  }
  if (search) {
    where.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (where.length) {
    query += ` WHERE ${where.join(' AND ')}`;
  }
  query += ' ORDER BY name ASC LIMIT ? OFFSET ?';
  params.push(limit || 50, offset || 0);

  const rows = db.prepare(query).all(...params);
  res.json({ products: rows.map(serializeProduct) });
});

router.get('/categories', (_req, res) => {
  const rows = db.prepare('SELECT category, COUNT(*) as count FROM products GROUP BY category').all();
  res.json({ categories: rows });
});

router.get('/:slug', (req, res) => {
  const row = db
    .prepare('SELECT slug, name, category, price, image, description, sizes FROM products WHERE slug = ?')
    .get(req.params.slug);
  if (!row) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ product: serializeProduct(row) });
});

export default router;

