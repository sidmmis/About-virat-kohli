import { Router } from 'express';
import { deleteDayMenu, getMenu, upsertDayMenu } from '../controllers/menu.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, getMenu);
router.post('/', requireAuth, requireRole('admin'), upsertDayMenu);
router.delete('/:day', requireAuth, requireRole('admin'), deleteDayMenu);

export default router;

