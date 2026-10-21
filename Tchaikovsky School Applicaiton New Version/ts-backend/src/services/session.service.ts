import { ISession, Session } from '@/models/session.model';
import { Types } from 'mongoose';

export const getSessions = async ({
  day,
  branch,
  instructor,
  student,
  type,
  status = 'pending',
  limit = 10,
  page = 1,
}: {
  day?: Date;
  branch?: Types.ObjectId;
  instructor?: Types.ObjectId;
  student?: Types.ObjectId;
  type?: 'in-person' | 'online' | 'theory';
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  page?: number;
} = {}) => {
  const filter: any = {};
  if (branch) filter.branch = branch;
  if (instructor) filter.instructor = instructor;
  if (student) filter.student = student;
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (day) {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    filter.startTime = { $gte: startOfDay, $lte: endOfDay };
  }

  const [sessions, total] = await Promise.all([
    Session.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit),
    Session.countDocuments(filter),
  ]);
  return { sessions, total };
};

export const createSession = async ({
  student,
  instructor,
  branch,
  type,
  startTime,
  duration,
  sessionNumber,
  totalSessions,
  status = 'scheduled',
}: {
  student: Types.ObjectId;
  instructor: Types.ObjectId;
  branch: Types.ObjectId;
  type: 'in-person' | 'online' | 'theory';
  startTime: Date;
  duration: number;
  sessionNumber: number;
  totalSessions: number;
  status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'missed';
}) => {
  const session = await Session.create({
    student,
    instructor,
    branch,
    type,
    startTime,
    duration,
    sessionNumber,
    totalSessions,
    status,
  });
  return session;
};

export const updateSession = async (id: string, data: Partial<ISession>) => {
  const session = await Session.findByIdAndUpdate(id, data, { new: true });
  return session;
};

export const deleteSession = async (id: string) => {
  const session = await Session.findByIdAndDelete(id);
  return session;
};
