import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listEvents = (_req: Request, res: Response) => {
  const events = store.getEvents();
  return sendSuccess(res, events, 'Events retrieved');
};

export const createEvent = (req: Request, res: Response) => {
  const { title, type, date, time, status, prizePool, location, description, registrationUrl } = req.body;
  if (!title || !date || !location) {
    return sendError(res, 'Title, date, and location are required', 400);
  }

  const item = store.createEvent({
    title,
    type: type || 'Workshop',
    date,
    time: time || 'TBD',
    status: status || 'upcoming',
    prizePool,
    location,
    description: description || '',
    registrationUrl: registrationUrl || 'https://discord.com/channels/1515283832419520522/1515610695729938482',
  });

  return sendSuccess(res, item, 'Event scheduled', 201);
};

export const deleteEvent = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = store.deleteEvent(id);
  if (!deleted) {
    return sendError(res, `Event ${id} not found`, 404);
  }
  return sendSuccess(res, { id }, 'Event deleted');
};
