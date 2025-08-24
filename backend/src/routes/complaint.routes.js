import { Router } from 'express';
import { allComplaints, createComplaint, myComplaints, updateStatus } from '../controllers/complaint.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, createComplaint);
router.get('/me', requireAuth, myComplaints);
router.get('/', requireAuth, requireRole('admin'), allComplaints);
router.patch('/:id', requireAuth, requireRole('admin'), updateStatus);

export default router;

