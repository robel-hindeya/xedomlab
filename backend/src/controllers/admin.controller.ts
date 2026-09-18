import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { env } from '../config/env.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getDashboardStats = (_req: Request, res: Response) => {
  const stats = store.getStats();
  return sendSuccess(res, stats, 'Dashboard stats retrieved');
};

export const adminLogin = (req: Request, res: Response) => {
  const { secretKey } = req.body;
  if (!secretKey) {
    return sendError(res, 'Secret key required', 400);
  }

  if (secretKey === env.ADMIN_TOKEN) {
    return sendSuccess(
      res,
      {
        token: env.ADMIN_TOKEN,
        role: 'admin',
        adminName: 'Robel Hindeya',
      },
      'Authentication successful'
    );
  }

  return sendError(res, 'Invalid admin key', 401);
};
