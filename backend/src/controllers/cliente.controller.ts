import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';

const updateClienteSchema = z.object({
  nome: z.string().min(2).optional(),
  telefone: z.string().optional(),
  corPrimaria: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  corSecundaria: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  whatsapp: z.string().optional(),
});

export const getClienteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;

    // Verify user can only access their own cliente data
    if (id !== req.user.clienteId) {
      throw new AppError(403, 'Access denied');
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        logo: true,
        corPrimaria: true,
        corSecundaria: true,
        subdominio: true,
        whatsapp: true,
        status: true,
        planValue: true,
        setupPago: true,
        createdAt: true,
        updatedAt: true,
        // Exclude senha
      },
    });

    if (!cliente) {
      throw new AppError(404, 'Cliente not found');
    }

    res.json({
      success: true,
      data: cliente,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;

    // Verify user can only update their own cliente data
    if (id !== req.user.clienteId) {
      throw new AppError(403, 'Access denied');
    }

    const data = updateClienteSchema.parse(req.body);

    const updatedCliente = await prisma.cliente.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        logo: true,
        corPrimaria: true,
        corSecundaria: true,
        subdominio: true,
        whatsapp: true,
        status: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: updatedCliente,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadLogo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;

    // Verify user can only update their own cliente data
    if (id !== req.user.clienteId) {
      throw new AppError(403, 'Access denied');
    }

    // TODO: Implement file upload logic
    // This is a placeholder. In production:
    // 1. Use multer to handle file upload
    // 2. Validate file type and size
    // 3. Upload to S3/Cloudflare R2
    // 4. Update cliente.logo with URL

    throw new AppError(501, 'Logo upload not yet implemented');
  } catch (error) {
    next(error);
  }
};
