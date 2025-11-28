import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { authenticatedRateLimit } from '../middlewares/rateLimit';
import {
  getOverviewMetrics,
  getChartData,
  getMetrics,
  getLeadsTimeline,
  getLeadsBySource,
  getConversionFunnel,
} from '../controllers/metrics.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);
router.use(authenticatedRateLimit);

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Métricas gerais
 *     description: Retorna todas as métricas disponíveis
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas gerais
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       401:
 *         description: Não autenticado
 */
router.get('/', getMetrics);

/**
 * @swagger
 * /api/metrics/overview:
 *   get:
 *     summary: Métricas de overview
 *     description: Retorna métricas resumidas para o dashboard
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 60d, 90d]
 *           default: 30d
 *         description: Período para análise
 *     responses:
 *       200:
 *         description: Métricas de overview
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MetricsOverview'
 *       401:
 *         description: Não autenticado
 */
router.get('/overview', getOverviewMetrics);

/**
 * @swagger
 * /api/metrics/chart:
 *   get:
 *     summary: Dados para gráficos (deprecated)
 *     description: Use /leads-timeline ao invés deste endpoint
 *     deprecated: true
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do gráfico
 *       401:
 *         description: Não autenticado
 */
router.get('/chart', getChartData);

/**
 * @swagger
 * /api/metrics/leads-timeline:
 *   get:
 *     summary: Timeline de leads
 *     description: Retorna quantidade de leads por dia no período especificado
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 60d, 90d]
 *           default: 30d
 *         description: Período para análise
 *     responses:
 *       200:
 *         description: Timeline de leads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-11-28"
 *                       leads:
 *                         type: integer
 *                         example: 15
 *       401:
 *         description: Não autenticado
 */
router.get('/leads-timeline', getLeadsTimeline);

/**
 * @swagger
 * /api/metrics/leads-by-source:
 *   get:
 *     summary: Leads por origem
 *     description: Retorna distribuição de leads por origem (landing page, WhatsApp, etc)
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 60d, 90d]
 *           default: 30d
 *         description: Período para análise
 *     responses:
 *       200:
 *         description: Leads por origem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       origem:
 *                         type: string
 *                         example: landing_page
 *                       count:
 *                         type: integer
 *                         example: 45
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 45.5
 *       401:
 *         description: Não autenticado
 */
router.get('/leads-by-source', getLeadsBySource);

/**
 * @swagger
 * /api/metrics/conversion-funnel:
 *   get:
 *     summary: Funil de conversão
 *     description: Retorna estatísticas do funil de conversão de leads
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 60d, 90d]
 *           default: 30d
 *         description: Período para análise
 *     responses:
 *       200:
 *         description: Funil de conversão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     stages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           stage:
 *                             type: string
 *                             example: novo
 *                           count:
 *                             type: integer
 *                             example: 100
 *                           percentage:
 *                             type: number
 *                             format: float
 *                             example: 100.0
 *                     conversionRate:
 *                       type: number
 *                       format: float
 *                       example: 15.5
 *       401:
 *         description: Não autenticado
 */
router.get('/conversion-funnel', getConversionFunnel);

export default router;
