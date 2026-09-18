import { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const sendError = (res: Response, message: string = 'Internal Server Error', statusCode: number = 500, error?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? String(error) : undefined,
    timestamp: new Date().toISOString(),
  });
};
