import { Router } from 'express';
import authRoutes from './auth.routes';
import leadRoutes from './lead.routes';
import clienteRoutes from './cliente.routes';
import metricsRoutes from './metrics.routes';
import webhookRoutes from './webhook.routes';

const router = Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/webhooks', webhookRoutes);

// Protected routes
router.use('/leads', leadRoutes);
router.use('/clientes', clienteRoutes);
router.use('/metrics', metricsRoutes);

export default router;
