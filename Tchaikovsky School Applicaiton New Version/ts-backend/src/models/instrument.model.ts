import { model, Types, Schema } from 'mongoose';

export interface IInstrument {
  _id: Types.ObjectId;
  name: string;
}

const instrumentSchema = new Schema<IInstrument>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Instrument = model<IInstrument>('Instrument', instrumentSchema);

export default Instrument;
