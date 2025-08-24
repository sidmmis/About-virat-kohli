import { Router } from 'express';
import { allLeaves, applyLeave, myLeaves, updateLeaveStatus } from '../controllers/leave.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, applyLeave);
router.get('/me', requireAuth, myLeaves);
router.get('/', requireAuth, requireRole('admin'), allLeaves);
router.patch('/:id', requireAuth, requireRole('admin'), updateLeaveStatus);

export default router;

