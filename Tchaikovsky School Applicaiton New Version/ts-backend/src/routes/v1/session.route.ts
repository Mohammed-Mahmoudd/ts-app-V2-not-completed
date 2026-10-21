import { Router } from 'express';
import { protect, restrictTo } from '@/middleware/auth.middleware';
import {
  getAllSessions,
  createSession,
  updateSession,
  deleteSession,
} from '@/controllers/v1/session.controller';
import {
  addFeedback,
  getAllFeedbacks,
} from '@/controllers/v1/feedback.controller';

const router = Router();

router.use(protect);

router.get('/', getAllSessions);
router.post('/', restrictTo('admin'), createSession);
router.patch('/:id', restrictTo('admin'), updateSession);
router.delete('/:id', restrictTo('admin'), deleteSession);

// Feedback routes
router.post(
  '/:sessionId/feedback',
  restrictTo('student', 'instructor'),
  addFeedback,
);
router.get('/:sessionId/feedback', getAllFeedbacks);

export default router;
