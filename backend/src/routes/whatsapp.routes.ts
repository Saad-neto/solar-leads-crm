import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  handleWebhook,
  getSessionStatus,
  getQRCode,
  sendMessageToLead,
  startConversation,
} from '../controllers/whatsapp.controller';

const router = Router();

// Public webhook endpoint (WAHA will call this)
router.post('/webhook', handleWebhook);

// Protected routes
router.get('/status', authenticate, getSessionStatus);
router.get('/qrcode', authenticate, getQRCode);
router.post('/send', authenticate, sendMessageToLead);
router.post('/start-conversation', authenticate, startConversation);

export default router;
