import { Router } from 'express';
import { listSocials, updateSocial } from '../controllers/socials.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const socialsRouter = Router();

socialsRouter.get('/', listSocials);
socialsRouter.put('/:id', requireAdminAuth, updateSocial);
