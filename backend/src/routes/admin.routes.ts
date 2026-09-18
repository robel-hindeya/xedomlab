import { Router } from 'express';
import { getDashboardStats, adminLogin } from '../controllers/admin.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const adminRouter = Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/stats', requireAdminAuth, getDashboardStats);
