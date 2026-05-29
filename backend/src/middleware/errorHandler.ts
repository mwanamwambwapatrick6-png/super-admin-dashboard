import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  message: string;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[Error]', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
};

export class CustomError extends Error implements ApiError {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
