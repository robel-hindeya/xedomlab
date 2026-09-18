import { Router } from 'express';
import { listSubscribers, addSubscriber, deleteSubscriber } from '../controllers/subscribers.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const subscribersRouter = Router();

subscribersRouter.get('/', requireAdminAuth, listSubscribers);
subscribersRouter.post('/', addSubscriber);
subscribersRouter.delete('/:id', requireAdminAuth, deleteSubscriber);
