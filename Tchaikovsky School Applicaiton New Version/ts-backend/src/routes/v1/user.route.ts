import { Router } from 'express';
import { getAllUsers } from '@/controllers/v1/user.controller';
import { protect, restrictTo } from '@/middleware/auth.middleware';

const router = Router();

// GET all users (Admin only)
router.get('/', protect, restrictTo('admin'), getAllUsers);

export default router;
