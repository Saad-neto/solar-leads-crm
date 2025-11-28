import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { publicRateLimit, authenticatedRateLimit } from '../middlewares/rateLimit';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  updateLeadNotes,
  exportLeads,
} from '../controllers/lead.controller';

const router = Router();

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Criar novo lead
 *     description: Cria um novo lead a partir da landing page (público)
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeadRequest'
 *     responses:
 *       201:
 *         description: Lead criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Muitas requisições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', publicRateLimit, createLead);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Listar leads
 *     description: Lista todos os leads com paginação e filtros
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página (max 100)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [novo, contatado, qualificado, proposta_enviada, ganho, perdido]
 *         description: Filtrar por status (múltiplos valores separados por vírgula)
 *       - in: query
 *         name: origem
 *         schema:
 *           type: string
 *           enum: [landing_page, whatsapp, facebook, google, indicacao, outros]
 *         description: Filtrar por origem
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar por cidade
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nome, email ou telefone
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, nome, valorConta, status]
 *           default: createdAt
 *         description: Campo para ordenação
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordem de classificação
 *     responses:
 *       200:
 *         description: Lista de leads com paginação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedLeads'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authenticate, authenticatedRateLimit, getLeads);

/**
 * @swagger
 * /api/leads/export:
 *   get:
 *     summary: Exportar leads para CSV
 *     description: Exporta todos os leads filtrados para arquivo CSV
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por status
 *       - in: query
 *         name: origem
 *         schema:
 *           type: string
 *         description: Filtrar por origem
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final
 *     responses:
 *       200:
 *         description: Arquivo CSV
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Não autenticado
 */
router.get('/export', authenticate, authenticatedRateLimit, exportLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Buscar lead por ID
 *     description: Retorna os detalhes de um lead específico
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do lead
 *     responses:
 *       200:
 *         description: Detalhes do lead
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Lead não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autenticado
 */
router.get('/:id', authenticate, authenticatedRateLimit, getLeadById);

/**
 * @swagger
 * /api/leads/{id}/status:
 *   patch:
 *     summary: Atualizar status do lead
 *     description: Atualiza o status de um lead específico
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do lead
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [novo, contatado, qualificado, proposta_enviada, ganho, perdido]
 *                 example: contatado
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Status inválido
 *       404:
 *         description: Lead não encontrado
 *       401:
 *         description: Não autenticado
 */
router.patch('/:id/status', authenticate, authenticatedRateLimit, updateLeadStatus);

/**
 * @swagger
 * /api/leads/{id}/notes:
 *   patch:
 *     summary: Atualizar observações do lead
 *     description: Atualiza as observações de um lead específico
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do lead
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               observacoes:
 *                 type: string
 *                 example: Cliente solicitou orçamento detalhado
 *             required:
 *               - observacoes
 *     responses:
 *       200:
 *         description: Observações atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Lead não encontrado
 *       401:
 *         description: Não autenticado
 */
router.patch('/:id/notes', authenticate, authenticatedRateLimit, updateLeadNotes);

export default router;
