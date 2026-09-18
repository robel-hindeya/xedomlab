import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess } from '../utils/response.js';

export const getHealth = (_req: Request, res: Response) => {
  const stats = store.getStats();
  return sendSuccess(
    res,
    {
      status: 'operational',
      uptime: stats.serverUptime,
      timestamp: new Date().toISOString(),
      service: 'xedom-backend',
      version: '1.0.0',
    },
    'Service is operational'
  );
};
