import { logger } from '@/lib/logger';
import {
  getDashboardStats,
  getFeedbacks,
  getRequests,
} from '@/services/admin.service';
import { getSessions } from '@/services/session.service';
import { Request, Response } from 'express';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();
    const { requests, total: requestsTotal } = await getRequests();
    const { sessions, total: sessionsTotal } = await getSessions();
    const { feedbacks, total: feedbacksTotal } = await getFeedbacks();
    return res.status(200).json({
      stats,
      requests,
      requestsTotal,
      sessions,
      sessionsTotal,
      feedbacks,
      feedbacksTotal,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to get dashboard stats', error });
  }
};
