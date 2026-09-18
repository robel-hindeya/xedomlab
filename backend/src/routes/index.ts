import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { productsRouter } from './products.routes.js';
import { newsRouter } from './news.routes.js';
import { eventsRouter } from './events.routes.js';
import { ambassadorsRouter } from './ambassadors.routes.js';
import { subscribersRouter } from './subscribers.routes.js';
import { socialsRouter } from './socials.routes.js';
import { adminRouter } from './admin.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/news', newsRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/ambassadors', ambassadorsRouter);
apiRouter.use('/subscribers', subscribersRouter);
apiRouter.use('/socials', socialsRouter);
apiRouter.use('/admin', adminRouter);
