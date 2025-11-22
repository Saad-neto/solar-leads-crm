import { Router } from 'express';
import { authRateLimit } from '../middlewares/rateLimit';
import { login, refreshToken } from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/login
router.post('/login', authRateLimit, login);

// POST /api/auth/refresh
router.post('/refresh', refreshToken);

export default router;
