import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl || req.url;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor =
      status >= 500
        ? '\x1b[31m' // red
        : status >= 400
        ? '\x1b[33m' // yellow
        : status >= 300
        ? '\x1b[36m' // cyan
        : '\x1b[32m'; // green
    const reset = '\x1b[0m';

    console.log(
      `[API] ${method.padEnd(6)} ${url} ${statusColor}${status}${reset} - ${duration}ms`
    );
  });

  next();
};
