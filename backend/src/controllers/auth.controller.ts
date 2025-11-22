import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user (Cliente or Usuario)
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (!cliente) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, cliente.senha);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Generate tokens
    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error('JWT secrets not configured');
    }

    const payload = {
      userId: cliente.id,
      clienteId: cliente.id,
      email: cliente.email,
      role: 'ADMIN', // Cliente is always admin
    };

    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    });

    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          subdominio: cliente.subdominio,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);

    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error('JWT secrets not configured');
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as any;

    // Generate new access token
    const payload = {
      userId: decoded.userId,
      clienteId: decoded.clienteId,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    });

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
