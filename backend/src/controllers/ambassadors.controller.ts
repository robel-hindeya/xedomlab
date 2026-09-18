import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listAmbassadors = (_req: Request, res: Response) => {
  const ambassadors = store.getAmbassadors();
  return sendSuccess(res, ambassadors, 'Ambassador applications retrieved');
};

export const applyAmbassador = (req: Request, res: Response) => {
  const { name, email, githubUrl, xUrl, portfolioUrl, track, reason } = req.body;
  if (!name || !email || !reason) {
    return sendError(res, 'Name, email, and reason are required', 400);
  }

  const app = store.createAmbassadorApplication({
    name,
    email,
    githubUrl,
    xUrl,
    portfolioUrl,
    track: track || 'Developer Advocate',
    reason,
  });

  return sendSuccess(res, app, 'Application submitted successfully', 201);
};

export const updateAmbassadorStatus = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return sendError(res, 'Invalid status. Allowed: pending, approved, rejected', 400);
  }

  const updated = store.updateAmbassadorStatus(id, status);
  if (!updated) {
    return sendError(res, `Application ${id} not found`, 404);
  }
  return sendSuccess(res, updated, 'Application status updated');
};

export const deleteAmbassador = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = store.deleteAmbassador(id);
  if (!deleted) {
    return sendError(res, `Application ${id} not found`, 404);
  }
  return sendSuccess(res, { id }, 'Application deleted');
};
