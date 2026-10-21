import {
  createInstrument,
  deleteInstrument,
  getInstruments,
} from '@/controllers/v1/instrument.controller';
import { protect, restrictTo } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', getInstruments);
router.post('/', protect, restrictTo('admin'), createInstrument);
router.delete('/:id', protect, restrictTo('admin'), deleteInstrument);

export default router;
