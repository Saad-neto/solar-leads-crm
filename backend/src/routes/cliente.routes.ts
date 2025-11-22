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

// GET /api/clientes/:id
router.get('/:id', getClienteById);

// PATCH /api/clientes/:id
router.patch('/:id', updateCliente);

// POST /api/clientes/:id/logo
router.post('/:id/logo', uploadLogo);

export default router;
