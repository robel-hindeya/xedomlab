import { Router } from 'express';
import { listNews, createNews, deleteNews } from '../controllers/news.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const newsRouter = Router();

newsRouter.get('/', listNews);
newsRouter.post('/', requireAdminAuth, createNews);
newsRouter.delete('/:id', requireAdminAuth, deleteNews);
