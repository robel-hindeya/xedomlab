import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';
import { sendError } from '../utils/response.js';

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return sendError(res, 'Authorization header missing', 401);
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token !== env.ADMIN_TOKEN) {
    return sendError(res, 'Invalid or expired admin token', 403);
  }

  next();
};
