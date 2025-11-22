import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  // Custom app errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: `Record already exists: ${prismaError.meta?.target || 'unknown field'}`,
      });
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default server error
  console.error('Unhandled error:', error);

  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development'
      ? error.message
      : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
