import express, { Express } from 'express';
import cors from 'cors';
import { apiRouter } from './routes/index.js';
import { requestLogger } from './middleware/logger.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { env } from './config/env.js';

export const createApp = (): Express => {
  const app = express();

  // Basic Middleware
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Root welcome route
  app.get('/', (_req, res) => {
    res.json({
      name: 'Xedom Lab API',
      status: 'operational',
      version: '1.0.0',
      docs: '/api/health',
      endpoints: {
        health: '/api/health',
        products: '/api/products',
        news: '/api/news',
        events: '/api/events',
        ambassadors: '/api/ambassadors',
        subscribers: '/api/subscribers',
        socials: '/api/socials',
        adminStats: '/api/admin/stats',
      },
    });
  });

  // Mount API routes
  app.use('/api', apiRouter);

  // Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
