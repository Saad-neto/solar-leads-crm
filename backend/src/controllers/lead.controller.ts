import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';
import { LeadStatus } from '@prisma/client';

const createLeadSchema = z.object({
  nome: z.string().min(2, 'Name is required'),
  telefone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email().optional(),
  cidade: z.string().optional(),
  valorConta: z.enum(['ATE_200', 'DE_200_A_500', 'DE_500_A_1000', 'ACIMA_1000']).optional(),
  clienteId: z.string(),
  origem: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

const updateNotesSchema = z.object({
  notas: z.string(),
});

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: LeadStatus.NOVO,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        leadId: lead.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const {
      status,
      origem,
      cidade,
      search,
      dateFrom,
      dateTo,
      valorConta,
      page = '1',
      pageSize = '25',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build WHERE clause
    const where: any = {
      clienteId: req.user.clienteId,
    };

    // Filter by status (can be multiple)
    if (status) {
      const statusArray = Array.isArray(status) ? status : [status];
      if (statusArray.length === 1) {
        where.status = statusArray[0];
      } else if (statusArray.length > 1) {
        where.status = { in: statusArray };
      }
    }

    // Filter by origem (can be multiple)
    if (origem) {
      const origemArray = Array.isArray(origem) ? origem : [origem];
      if (origemArray.length === 1) {
        where.origem = origemArray[0];
      } else if (origemArray.length > 1) {
        where.origem = { in: origemArray };
      }
    }

    // Filter by cidade (can be multiple)
    if (cidade) {
      const cidadeArray = Array.isArray(cidade) ? cidade : [cidade];
      if (cidadeArray.length === 1) {
        where.cidade = cidadeArray[0];
      } else if (cidadeArray.length > 1) {
        where.cidade = { in: cidadeArray };
      }
    }

    // Filter by valorConta
    if (valorConta) {
      where.valorConta = valorConta;
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom as string);
      }
      if (dateTo) {
        // Add 1 day to include the entire end date
        const endDate = new Date(dateTo as string);
        endDate.setDate(endDate.getDate() + 1);
        where.createdAt.lt = endDate;
      }
    }

    // Search by name, email or phone
    if (search && typeof search === 'string') {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { telefone: { contains: search } },
      ];
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const pageSizeNum = Math.min(100, Math.max(1, parseInt(pageSize as string) || 25));
    const skip = (pageNum - 1) * pageSizeNum;

    // Sorting
    const validSortFields = ['createdAt', 'nome', 'status', 'cidade', 'valorConta'];
    const sortField = validSortFields.includes(sortBy as string) ? (sortBy as string) : 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [sortField]: sortDirection },
        skip,
        take: pageSizeNum,
      }),
      prisma.lead.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSizeNum);

    res.json({
      success: true,
      data: {
        leads,
        total,
        pagination: {
          page: pageNum,
          pageSize: pageSizeNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
          itemsOnPage: leads.length,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        clienteId: req.user.clienteId,
      },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;
    const { status } = updateStatusSchema.parse(req.body);

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        clienteId: req.user.clienteId,
      },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status,
        ...(status === LeadStatus.CONTATADO && !lead.contatadoEm
          ? { contatadoEm: new Date() }
          : {}),
        ...(status === LeadStatus.QUALIFICADO && !lead.qualificadoEm
          ? { qualificadoEm: new Date() }
          : {}),
      },
    });

    res.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { id } = req.params;
    const { notas } = updateNotesSchema.parse(req.body);

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        clienteId: req.user.clienteId,
      },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { notas },
    });

    res.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

export const exportLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { startDate, endDate } = req.query;

    const where: any = {
      clienteId: req.user.clienteId,
    };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'ID',
      'Nome',
      'Email',
      'Telefone',
      'Cidade',
      'Valor Conta',
      'Tipo Imóvel',
      'Interesse',
      'Status',
      'Origem',
      'Data Criação',
    ];

    const csv = [
      headers.join(','),
      ...leads.map((lead) =>
        [
          lead.id,
          lead.nome,
          lead.email || '',
          lead.telefone,
          lead.cidade || '',
          lead.valorConta || '',
          lead.tipoImovel || '',
          lead.interesse || '',
          lead.status,
          lead.origem || '',
          lead.createdAt.toISOString(),
        ].join(',')
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=leads-${new Date().toISOString()}.csv`
    );
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
