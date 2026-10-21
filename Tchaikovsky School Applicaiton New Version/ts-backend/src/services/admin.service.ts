import { Feedback } from '@/models/feedback.model';
import { Request } from '@/models/request.model';
import { Session } from '@/models/session.model';
import { User } from '@/models/user.model';
import { Types } from 'mongoose';

export const getDashboardStats = async () => {
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalInstructors = await User.countDocuments({ role: 'instructor' });
  // TODO: get total sheet musics and daily sessions
  const totalSheetMusics = 0;
  const dailySessions = await Session.countDocuments({
    startTime: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 59, 999)),
    },
  });
  return { totalStudents, totalInstructors, totalSheetMusics, dailySessions };
};

export const getRequests = async ({
  branch,
  type,
  status = 'pending',
  limit = 10,
  page = 1,
}: {
  branch?: Types.ObjectId;
  type?: 'application' | 'reschedule' | 'cancellation';
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  page?: number;
} = {}) => {
  const filter: any = {};
  if (branch) filter.branch = branch;
  if (type) filter.type = type;
  if (status) filter.status = status;

  const [requests, total] = await Promise.all([
    Request.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit),
    Request.countDocuments(filter),
  ]);
  return { requests, total };
};

export const getFeedbacks = async ({
  branch,
  type,
  status = 'pending',
  limit = 10,
  page = 1,
}: {
  branch?: Types.ObjectId;
  type?: 'in-person' | 'online' | 'theory';
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  page?: number;
} = {}) => {
  const filter: any = {};
  if (branch) filter.branch = branch;
  if (type) filter.type = type;
  if (status) filter.status = status;

  const [feedbacks, total] = await Promise.all([
    Feedback.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit),
    Feedback.countDocuments(filter),
  ]);
  return { feedbacks, total };
};
