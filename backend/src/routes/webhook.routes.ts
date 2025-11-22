import { Router } from 'express';
import { handleWAHAWebhook } from '../controllers/webhook.controller';

const router = Router();

// POST /api/webhooks/waha
// Webhook called by WAHA when WhatsApp messages arrive
router.post('/waha', handleWAHAWebhook);

export default router;
