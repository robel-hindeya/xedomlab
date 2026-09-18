import { Router } from 'express';
import { listEvents, createEvent, deleteEvent } from '../controllers/events.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const eventsRouter = Router();

eventsRouter.get('/', listEvents);
eventsRouter.post('/', requireAdminAuth, createEvent);
eventsRouter.delete('/:id', requireAdminAuth, deleteEvent);
