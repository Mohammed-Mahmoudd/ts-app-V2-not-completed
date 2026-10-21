import { Schema, model, Types, Model } from 'mongoose';

export interface IFeeback {
  session: Types.ObjectId;
  user: Types.ObjectId;
  HWComment?: string;
  HWRating?: number;
  comment: string;
  rating: number;
  isReviewed: boolean;
  adminReply?: string;
  sheetFiles?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

type FeedbackModel = Model<IFeeback>;

const feedbackSchema = new Schema<IFeeback, FeedbackModel>(
  {
    session: {
      type: Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    HWComment: {
      type: String,
    },
    HWRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    adminReply: {
      type: String,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

feedbackSchema.index({ session: 1, user: 1 }, { unique: true });

export const Feedback = model<IFeeback, FeedbackModel>(
  'Feedback',
  feedbackSchema,
);
