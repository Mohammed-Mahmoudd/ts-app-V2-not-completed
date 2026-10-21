import { Feedback } from '@/models/feedback.model';
import { Types } from 'mongoose';

export const createFeedback = async ({
  user,
  session,
  HWComment,
  HWRating,
  comment,
  rating,
}: {
  user: Types.ObjectId;
  session: Types.ObjectId;
  HWComment?: string;
  HWRating?: number;
  comment: string;
  rating: number;
}) => {
  const feedback = await Feedback.create({
    user,
    session,
    HWComment,
    HWRating,
    comment,
    rating,
  });
  return feedback;
};

export const getFeedbacks = async ({
  userId,
  role,
}: {
  userId: Types.ObjectId;
  role: 'admin' | 'instructor' | 'student';
}) => {
  switch (role) {
    case 'admin':
      return await Feedback.find();
    case 'instructor':
      return await Feedback.find({ user: userId });
    case 'student':
      return await Feedback.aggregate([
        {
          $lookup: {
            from: 'sessions',
            localField: 'session',
            foreignField: '_id',
            as: 'session',
          },
        },
        { $unwind: '$session' },
        { $match: { 'session.student': userId } },
      ]);
  }
};

export const updateFeedback = async ({
  feedbackId,
  data,
}: {
  feedbackId: Types.ObjectId;
  data: {
    HWComment?: string;
    HWRating?: number;
    comment?: string;
    rating?: number;
  };
}) => {
  const feedback = await Feedback.findByIdAndUpdate(feedbackId, data, {
    new: true,
  });
  return feedback;
};

export const deleteFeedback = async ({
  feedbackId,
}: {
  feedbackId: Types.ObjectId;
}) => {
  const feedback = await Feedback.findByIdAndDelete(feedbackId);
  return feedback;
};
