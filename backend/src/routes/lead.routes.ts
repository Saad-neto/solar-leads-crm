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

// Public route - Create lead from landing page
router.post('/', publicRateLimit, createLead);

// Protected routes - Dashboard
router.get('/', authenticate, authenticatedRateLimit, getLeads);
router.get('/export', authenticate, authenticatedRateLimit, exportLeads);
router.get('/:id', authenticate, authenticatedRateLimit, getLeadById);
router.patch('/:id/status', authenticate, authenticatedRateLimit, updateLeadStatus);
router.patch('/:id/notes', authenticate, authenticatedRateLimit, updateLeadNotes);

export default router;
