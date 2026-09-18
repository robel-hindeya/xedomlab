import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listSocials = (_req: Request, res: Response) => {
  const socials = store.getSocials();
  return sendSuccess(res, socials, 'Social media links retrieved');
};

export const updateSocial = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { url, handle, description, badge } = req.body;

  const updated = store.updateSocial(id, { url, handle, description, badge });
  if (!updated) {
    return sendError(res, `Social platform ${id} not found`, 404);
  }

  return sendSuccess(res, updated, `Social link for ${id} updated successfully`);
};
