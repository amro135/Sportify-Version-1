import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import db from '../db.js';
import { validateBody } from '../middleware/validate.js';
import { issueAuthToken, clearAuthToken, requireAuth } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(2).max(40),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/register', validateBody(registerSchema), (req, res) => {
  const { username, email, password } = req.validatedBody;
  const normalizedEmail = email.trim().toLowerCase();

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)')
    .run(username.trim(), normalizedEmail, passwordHash);

  const user = { id: result.lastInsertRowid, username: username.trim(), email: normalizedEmail };
  issueAuthToken(res, user);

  return res.status(201).json({ user });
});

router.post('/login', validateBody(loginSchema), (req, res) => {
  const { email, password } = req.validatedBody;
  const normalizedEmail = email.trim().toLowerCase();

  const user = db.prepare('SELECT id, username, email, password_hash FROM users WHERE email = ?').get(normalizedEmail);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { id: user.id, username: user.username, email: user.email };
  issueAuthToken(res, payload);
  return res.json({ user: payload });
});

router.post('/logout', (_req, res) => {
  clearAuthToken(res);
  res.json({ message: 'Logged out' });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    clearAuthToken(res);
    return res.status(401).json({ message: 'Session no longer valid' });
  }
  res.json({ user });
});

export default router;

