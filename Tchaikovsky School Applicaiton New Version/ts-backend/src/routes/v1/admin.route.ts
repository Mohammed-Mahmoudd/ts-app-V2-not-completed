import { getDashboard } from '@/controllers/v1/admin.controller';
import { protect, restrictTo } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.get('/dashboard', protect, restrictTo('admin'), getDashboard);

export default router;
