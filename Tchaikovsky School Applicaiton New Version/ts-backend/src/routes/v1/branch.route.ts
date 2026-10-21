import {
  createBranch,
  deleteBranch,
  getBranches,
} from '@/controllers/v1/branch.controller';
import { protect, restrictTo } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', getBranches);
router.post('/', protect, restrictTo('admin'), createBranch);
router.delete('/:id', protect, restrictTo('admin'), deleteBranch);

export default router;
