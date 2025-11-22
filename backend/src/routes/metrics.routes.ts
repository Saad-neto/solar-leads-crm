import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { authenticatedRateLimit } from '../middlewares/rateLimit';
import {
  getOverviewMetrics,
  getChartData,
  getMetrics,
} from '../controllers/metrics.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);
router.use(authenticatedRateLimit);

// GET /api/metrics
router.get('/', getMetrics);

// GET /api/metrics/overview
router.get('/overview', getOverviewMetrics);

// GET /api/metrics/chart
router.get('/chart', getChartData);

export default router;
