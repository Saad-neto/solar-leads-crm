import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';
import { LeadStatus } from '@prisma/client';

export const getOverviewMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const clienteId = req.user.clienteId;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get counts
    const [
      leadsToday,
      leadsWeek,
      leadsMonth,
      totalLeads,
      leadsFechados,
      valorContaMedio,
    ] = await Promise.all([
      // Leads today
      prisma.lead.count({
        where: {
          clienteId,
          createdAt: { gte: today },
        },
      }),

      // Leads this week
      prisma.lead.count({
        where: {
          clienteId,
          createdAt: { gte: weekAgo },
        },
      }),

      // Leads this month
      prisma.lead.count({
        where: {
          clienteId,
          createdAt: { gte: monthAgo },
        },
      }),

      // Total leads
      prisma.lead.count({
        where: { clienteId },
      }),

      // Closed leads
      prisma.lead.count({
        where: {
          clienteId,
          status: LeadStatus.FECHADO,
        },
      }),

      // Average bill value (placeholder - need to aggregate properly)
      prisma.lead.count({
        where: {
          clienteId,
          valorConta: { not: null },
        },
      }),
    ]);

    // Calculate conversion rate
    const conversionRate = totalLeads > 0
      ? ((leadsFechados / totalLeads) * 100).toFixed(2)
      : '0.00';

    res.json({
      success: true,
      data: {
        leadsToday,
        leadsWeek,
        leadsMonth,
        totalLeads,
        leadsFechados,
        conversionRate: `${conversionRate}%`,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getChartData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const clienteId = req.user.clienteId;
    const { days = '30' } = req.query;
    const daysNum = parseInt(days as string);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    // Get leads grouped by date
    const leads = await prisma.lead.groupBy({
      by: ['createdAt'],
      where: {
        clienteId,
        createdAt: { gte: startDate },
      },
      _count: true,
    });

    // Format data for chart
    const chartData = leads.map((item) => ({
      date: item.createdAt.toISOString().split('T')[0],
      count: item._count,
    }));

    res.json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    next(error);
  }
};

export const getMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const clienteId = req.user.clienteId;

    // Get leads by status
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      where: { clienteId },
      _count: true,
    });

    // Get leads by origem
    const leadsByOrigem = await prisma.lead.groupBy({
      by: ['origem'],
      where: { clienteId },
      _count: true,
    });

    // Get top cities
    const topCities = await prisma.lead.groupBy({
      by: ['cidade'],
      where: {
        clienteId,
        cidade: { not: null },
      },
      _count: true,
      orderBy: {
        _count: {
          cidade: 'desc',
        },
      },
      take: 5,
    });

    res.json({
      success: true,
      data: {
        leadsByStatus: leadsByStatus.map((item) => ({
          status: item.status,
          count: item._count,
        })),
        leadsByOrigem: leadsByOrigem.map((item) => ({
          origem: item.origem || 'unknown',
          count: item._count,
        })),
        topCities: topCities.map((item) => ({
          cidade: item.cidade,
          count: item._count,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
