import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  ADMIN_ORIGIN: process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || 'xedom-admin-secret-2026',
};
