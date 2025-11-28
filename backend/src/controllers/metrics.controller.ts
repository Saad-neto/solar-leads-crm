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
    const twoMonthsAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Get counts
    const [
      leadsToday,
      leadsWeek,
      leadsMonth,
      leadsLastMonth,
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

      // Leads this month (last 30 days)
      prisma.lead.count({
        where: {
          clienteId,
          createdAt: { gte: monthAgo },
        },
      }),

      // Leads last month (30-60 days ago)
      prisma.lead.count({
        where: {
          clienteId,
          createdAt: {
            gte: twoMonthsAgo,
            lt: monthAgo,
          },
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

    // Calculate growth percentage (this month vs last month)
    let growthPercentage = 0;
    if (leadsLastMonth > 0) {
      growthPercentage = ((leadsMonth - leadsLastMonth) / leadsLastMonth) * 100;
    } else if (leadsMonth > 0) {
      growthPercentage = 100; // If we had 0 last month and > 0 this month, 100% growth
    }

    res.json({
      success: true,
      data: {
        leadsToday,
        leadsWeek,
        leadsMonth,
        totalLeads,
        leadsFechados,
        conversionRate: `${conversionRate}%`,
        growthPercentage: parseFloat(growthPercentage.toFixed(1)),
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

export const getLeadsTimeline = async (
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
    const daysNum = Math.min(365, Math.max(7, parseInt(days as string) || 30));

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);
    startDate.setHours(0, 0, 0, 0);

    // Get all leads in the period
    const leads = await prisma.lead.findMany({
      where: {
        clienteId,
        createdAt: { gte: startDate },
      },
      select: {
        createdAt: true,
      },
    });

    // Group by date
    const dateMap = new Map<string, number>();

    // Initialize all dates with 0
    for (let i = 0; i < daysNum; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      dateMap.set(dateKey, 0);
    }

    // Count leads per date
    leads.forEach((lead) => {
      const dateKey = lead.createdAt.toISOString().split('T')[0];
      dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
    });

    // Convert to array sorted by date
    const chartData = Array.from(dateMap.entries())
      .map(([date, count]) => ({
        date,
        count,
        dateFormatted: new Date(date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
        }),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      success: true,
      data: {
        timeline: chartData,
        total: leads.length,
        period: `${daysNum} dias`,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadsBySource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const clienteId = req.user.clienteId;

    const leadsByOrigem = await prisma.lead.groupBy({
      by: ['origem'],
      where: { clienteId },
      _count: true,
      orderBy: {
        _count: {
          origem: 'desc',
        },
      },
    });

    const total = leadsByOrigem.reduce((sum, item) => sum + item._count, 0);

    const chartData = leadsByOrigem.map((item) => ({
      origem: item.origem || 'Desconhecida',
      count: item._count,
      percentage: total > 0 ? ((item._count / total) * 100).toFixed(1) : '0.0',
    }));

    res.json({
      success: true,
      data: {
        sources: chartData,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getConversionFunnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const clienteId = req.user.clienteId;

    // Count leads by key statuses
    const [novo, contatado, qualificado, negociacao, ganho, total] = await Promise.all([
      prisma.lead.count({ where: { clienteId, status: LeadStatus.NOVO } }),
      prisma.lead.count({ where: { clienteId, status: LeadStatus.CONTATADO } }),
      prisma.lead.count({ where: { clienteId, status: LeadStatus.QUALIFICADO } }),
      prisma.lead.count({ where: { clienteId, status: LeadStatus.NEGOCIACAO } }),
      prisma.lead.count({ where: { clienteId, status: LeadStatus.GANHO } }),
      prisma.lead.count({ where: { clienteId } }),
    ]);

    const funnel = [
      {
        stage: 'Novo',
        count: novo,
        percentage: total > 0 ? ((novo / total) * 100).toFixed(1) : '0.0',
      },
      {
        stage: 'Contatado',
        count: contatado,
        percentage: total > 0 ? ((contatado / total) * 100).toFixed(1) : '0.0',
      },
      {
        stage: 'Qualificado',
        count: qualificado,
        percentage: total > 0 ? ((qualificado / total) * 100).toFixed(1) : '0.0',
      },
      {
        stage: 'Negociação',
        count: negociacao,
        percentage: total > 0 ? ((negociacao / total) * 100).toFixed(1) : '0.0',
      },
      {
        stage: 'Ganho',
        count: ganho,
        percentage: total > 0 ? ((ganho / total) * 100).toFixed(1) : '0.0',
      },
    ];

    // Calculate conversion rate (ganho / total)
    const conversionRate = total > 0 ? ((ganho / total) * 100).toFixed(2) : '0.00';

    res.json({
      success: true,
      data: {
        funnel,
        total,
        ganho,
        conversionRate: `${conversionRate}%`,
      },
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
