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

/**
 * @swagger
 * /api/whatsapp/webhook:
 *   post:
 *     summary: Webhook do WhatsApp
 *     description: Endpoint público para receber eventos do WhatsApp
 *     tags: [WhatsApp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *               session:
 *                 type: string
 *               payload:
 *                 type: object
 *     responses:
 *       200:
 *         description: Webhook processado
 */
router.post('/webhook', handleWebhook);

/**
 * @swagger
 * /api/whatsapp/status:
 *   get:
 *     summary: Status da sessão WhatsApp
 *     description: Retorna o status da conexão WhatsApp (conectado, desconectado, QR code pendente)
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status da sessão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   enum: [WORKING, SCAN_QR_CODE, FAILED, STOPPED]
 *                   example: WORKING
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   example: 5511999999999
 *       401:
 *         description: Não autenticado
 */
router.get('/status', authenticate, getSessionStatus);

/**
 * @swagger
 * /api/whatsapp/qrcode:
 *   get:
 *     summary: Obter QR Code para conexão
 *     description: Retorna o QR Code em base64 para conectar o WhatsApp
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR Code gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 qrcode:
 *                   type: string
 *                   description: QR Code em base64
 *                   example: data:image/png;base64,iVBORw0KGgoAAAANS...
 *       400:
 *         description: QR Code não disponível (já conectado)
 *       401:
 *         description: Não autenticado
 */
router.get('/qrcode', authenticate, getQRCode);

/**
 * @swagger
 * /api/whatsapp/send:
 *   post:
 *     summary: Enviar mensagem para lead
 *     description: Envia uma mensagem via WhatsApp para um lead específico
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leadId:
 *                 type: string
 *                 example: cmiaplne20000...3cgz37gk2zd
 *               message:
 *                 type: string
 *                 example: Olá! Recebi seu interesse em energia solar. Como posso ajudar?
 *             required:
 *               - leadId
 *               - message
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messageId:
 *                   type: string
 *                   example: msg_abc123
 *       400:
 *         description: Lead não tem telefone ou mensagem inválida
 *       404:
 *         description: Lead não encontrado
 *       401:
 *         description: Não autenticado
 */
router.post('/send', authenticate, sendMessageToLead);

/**
 * @swagger
 * /api/whatsapp/start-conversation:
 *   post:
 *     summary: Iniciar conversa automatizada
 *     description: Inicia o fluxo de conversa automatizado com um lead via WhatsApp
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leadId:
 *                 type: string
 *                 example: cmiaplne20000...3cgz37gk2zd
 *               flowType:
 *                 type: string
 *                 enum: [qualification, followup, proposal]
 *                 example: qualification
 *                 description: Tipo de fluxo a iniciar
 *             required:
 *               - leadId
 *               - flowType
 *     responses:
 *       200:
 *         description: Conversa iniciada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 conversationId:
 *                   type: string
 *                   example: conv_abc123
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Lead não encontrado
 *       401:
 *         description: Não autenticado
 */
router.post('/start-conversation', authenticate, startConversation);

export default router;
