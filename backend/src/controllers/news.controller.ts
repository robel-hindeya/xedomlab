import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listNews = (_req: Request, res: Response) => {
  const news = store.getNews();
  return sendSuccess(res, news, 'News list retrieved');
};

export const createNews = (req: Request, res: Response) => {
  const { title, summary, content, category, readTime, author, tags } = req.body;
  if (!title || !content) {
    return sendError(res, 'Title and content are required', 400);
  }

  const item = store.createNews({
    title,
    summary: summary || title,
    content,
    category: category || 'General',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    readTime: readTime || '3 min read',
    author: author || 'Robel Hindeya',
    tags: Array.isArray(tags) ? tags : [],
  });

  return sendSuccess(res, item, 'News item published', 201);
};

export const deleteNews = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = store.deleteNews(id);
  if (!deleted) {
    return sendError(res, `News item ${id} not found`, 404);
  }
  return sendSuccess(res, { id }, 'News deleted');
};
