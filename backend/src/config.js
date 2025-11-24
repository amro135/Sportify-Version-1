import dotenv from 'dotenv';

dotenv.config();

const numberFromEnv = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const config = {
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5500',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  taxRate: numberFromEnv(process.env.TAX_RATE, 0.07),
  shippingFlat: numberFromEnv(process.env.SHIPPING_FLAT, 5.99),
};

