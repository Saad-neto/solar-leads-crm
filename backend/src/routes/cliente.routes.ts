import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { authenticatedRateLimit } from '../middlewares/rateLimit';
import {
  getClienteById,
  updateCliente,
  uploadLogo,
} from '../controllers/cliente.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);
router.use(authenticatedRateLimit);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     description: Retorna os detalhes de um cliente específico (integrador de energia solar)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Detalhes do cliente
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
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                       example: Solar Energy Integrador
 *                     email:
 *                       type: string
 *                       format: email
 *                     subdominio:
 *                       type: string
 *                       example: solarenergy
 *                     telefone:
 *                       type: string
 *                     logoUrl:
 *                       type: string
 *                       nullable: true
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autenticado
 */
router.get('/:id', getClienteById);

/**
 * @swagger
 * /api/clientes/{id}:
 *   patch:
 *     summary: Atualizar dados do cliente
 *     description: Atualiza informações do cliente (nome, telefone, etc)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Solar Energy Integrador Atualizado
 *               telefone:
 *                 type: string
 *                 example: 11999999999
 *               configuracoes:
 *                 type: object
 *                 properties:
 *                   whatsappEnabled:
 *                     type: boolean
 *                   leadNotifications:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autenticado
 */
router.patch('/:id', updateCliente);

/**
 * @swagger
 * /api/clientes/{id}/logo:
 *   post:
 *     summary: Upload de logo do cliente
 *     description: Faz upload da logo do integrador (imagem)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (PNG, JPG, JPEG)
 *             required:
 *               - logo
 *     responses:
 *       200:
 *         description: Logo enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 logoUrl:
 *                   type: string
 *                   example: https://storage.example.com/logos/cliente123.png
 *       400:
 *         description: Arquivo inválido
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Cliente não encontrado
 */
router.post('/:id/logo', uploadLogo);

export default router;
