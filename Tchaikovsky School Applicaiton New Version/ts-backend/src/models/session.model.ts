import { Schema, model, Types, Model } from 'mongoose';

export interface ISession {
  instructor: Types.ObjectId;
  student: Types.ObjectId;
  startTime: Date;
  duration: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'missed';
  branch: Types.ObjectId;
  type: 'in-person' | 'online' | 'theory';
  sessionNumber: number;
  totalSessions: number;
  createdAt: Date;
  updatedAt: Date;
}

type SessionModel = Model<ISession>;

const sessionSchema = new Schema<ISession, SessionModel>(
  {
    instructor: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    student: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'cancelled', 'missed'],
      default: 'scheduled',
    },
    branch: {
      type: Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    type: {
      type: String,
      enum: ['in-person', 'online', 'theory'],
      required: true,
    },
    sessionNumber: {
      type: Number,
      required: true,
    },
    totalSessions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Session = model<ISession, SessionModel>('Session', sessionSchema);
