import { Router } from 'express';
import authRoutes from './auth.routes';
import leadRoutes from './lead.routes';
import clienteRoutes from './cliente.routes';
import metricsRoutes from './metrics.routes';
import webhookRoutes from './webhook.routes';
import whatsappRoutes from './whatsapp.routes';

const router = Router();

console.log('📋 Registering routes...');
console.log('✅ Auth routes loaded:', typeof authRoutes);

// Public routes
router.use('/auth', authRoutes);
console.log('✅ Auth routes registered at /auth');

router.use('/webhooks', webhookRoutes);

// Protected routes
router.use('/leads', leadRoutes);
router.use('/clientes', clienteRoutes);
router.use('/metrics', metricsRoutes);
router.use('/whatsapp', whatsappRoutes);

console.log('✅ All routes registered');

export default router;
