import { Schema, model, Document, Types } from 'mongoose';

export interface IRefreshToken extends Document {
  token: string;
  user: Types.ObjectId;
  isRevoked: boolean;
  isUsed: boolean;
  expiresAt: Date;
  replacedBy?: string; // The token that replaced this one
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isRevoked: { type: Boolean, default: false },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
    replacedBy: { type: String },
  },
  { timestamps: true },
);

// Index to automatically delete expired tokens from MongoDB
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = model<IRefreshToken>(
  'RefreshToken',
  refreshTokenSchema,
);
