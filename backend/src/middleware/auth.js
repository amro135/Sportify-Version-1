import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const AUTH_COOKIE = 'sportify_token';

const getTokenFromRequest = (req) => {
  if (req.cookies?.[AUTH_COOKIE]) return req.cookies[AUTH_COOKIE];
  const header = req.get('authorization');
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return null;
  return token;
};

export const issueAuthToken = (res, payload) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export const clearAuthToken = (res) => {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const requireAuth = (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const optionalAuth = (req, _res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) return next();
  try {
    req.user = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    // ignore invalid token for optional auth
  }
  return next();
};

