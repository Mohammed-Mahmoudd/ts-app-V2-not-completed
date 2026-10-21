import { model, Types, Schema } from 'mongoose';

export interface IBranch {
  _id: Types.ObjectId;
  name: string;
  location: string;
}

const branchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

const Branch = model<IBranch>('Branch', branchSchema);

export default Branch;
