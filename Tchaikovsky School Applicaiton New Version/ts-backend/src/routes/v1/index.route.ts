import { Router } from 'express';
import userRouter from './user.route';
import authRouter from './auth.route';
import adminRouter from './admin.route';
import instrumentRoutes from './instrument.route';
import branchRoutes from './branch.route';
import sessionRoutes from './session.route';

const router = Router();

router.get('/', (_req, res) => {
  res.send('API v1 is running...');
});

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/sessions', sessionRoutes);
router.use('/instruments', instrumentRoutes);
router.use('/branches', branchRoutes);

export default router;
