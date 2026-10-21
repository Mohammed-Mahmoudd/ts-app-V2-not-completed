import { Schema, model, Types, Model } from 'mongoose';

export interface IRequest {
  requester: Types.ObjectId;
  type: 'application' | 'reschedule' | 'cancellation';
  status: 'pending' | 'approved' | 'rejected';
  payload: {
    notes?: string;
    from?: Date;
    to?: Date;
    branch?: Types.ObjectId;
    session?: Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

type RequestModel = Model<IRequest>;

const requestSchema = new Schema<IRequest, RequestModel>(
  {
    requester: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['application', 'reschedule', 'cancellation'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    payload: {
      notes: {
        type: String,
        default: undefined,
      },
      from: {
        type: Date,
        default: undefined,
      },
      to: {
        type: Date,
        default: undefined,
      },
      branch: {
        type: Types.ObjectId,
        ref: 'Branch',
        default: undefined,
      },
      session: {
        type: Types.ObjectId,
        ref: 'Session',
        default: undefined,
      },
    },
  },
  { timestamps: true },
);

export const Request = model<IRequest, RequestModel>('Request', requestSchema);
