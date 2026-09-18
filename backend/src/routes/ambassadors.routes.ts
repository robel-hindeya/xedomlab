import { Router } from 'express';
import {
  listAmbassadors,
  applyAmbassador,
  updateAmbassadorStatus,
  deleteAmbassador,
} from '../controllers/ambassadors.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const ambassadorsRouter = Router();

ambassadorsRouter.get('/', listAmbassadors);
ambassadorsRouter.post('/', applyAmbassador);
ambassadorsRouter.patch('/:id/status', requireAdminAuth, updateAmbassadorStatus);
ambassadorsRouter.delete('/:id', requireAdminAuth, deleteAmbassador);
