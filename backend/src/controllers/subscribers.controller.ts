import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listSubscribers = (_req: Request, res: Response) => {
  const subscribers = store.getSubscribers();
  return sendSuccess(res, subscribers, 'Subscribers list retrieved');
};

export const addSubscriber = (req: Request, res: Response) => {
  const { email, source } = req.body;
  if (!email || !email.includes('@')) {
    return sendError(res, 'Valid email address is required', 400);
  }

  const sub = store.addSubscriber(email, source);
  return sendSuccess(res, sub, 'Subscribed successfully', 201);
};

export const deleteSubscriber = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = store.deleteSubscriber(id);
  if (!deleted) {
    return sendError(res, `Subscriber ${id} not found`, 404);
  }
  return sendSuccess(res, { id }, 'Subscriber removed');
};
