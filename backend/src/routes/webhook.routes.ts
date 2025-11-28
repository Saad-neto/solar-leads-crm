import { Router } from 'express';
import { handleWebhook } from '../controllers/whatsapp.controller';

const router = Router();

/**
 * @swagger
 * /api/webhooks/quepasa:
 *   post:
 *     summary: Webhook do Quepasa
 *     description: Endpoint chamado automaticamente pelo Quepasa quando mensagens chegam via WhatsApp
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: message-id-123
 *               timestamp:
 *                 type: integer
 *                 example: 1701234567
 *               source:
 *                 type: string
 *                 description: Número do remetente
 *                 example: 5511999999999
 *               recipient:
 *                 type: string
 *                 description: Número do bot que recebeu
 *                 example: 5511963256658
 *               message:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: Olá, tenho interesse em energia solar
 *               fromMe:
 *                 type: boolean
 *                 description: Se a mensagem foi enviada pelo bot
 *                 example: false
 *     responses:
 *       200:
 *         description: Webhook processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Webhook received
 *       400:
 *         description: Payload inválido
 */
router.post('/quepasa', handleWebhook);

export default router;
