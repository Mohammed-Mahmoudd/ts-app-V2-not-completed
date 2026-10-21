import { Router } from 'express';

const router = Router();

router.patch('/:feedbackId');
router.delete('/:feedbackId');

export default router;
