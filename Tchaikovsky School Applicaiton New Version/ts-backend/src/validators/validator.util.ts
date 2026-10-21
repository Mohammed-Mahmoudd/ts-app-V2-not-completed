import { Types } from 'mongoose';
import z from 'zod';

export const phoneSchema = z.string().regex(/^\+\d{1,3}\d{7,12}$/, {
  message: 'Phone must start with + followed by country code and number',
});

export const objectIdSchema = z
  .string()
  .refine(Types.ObjectId.isValid)
  .transform((val) => new Types.ObjectId(val));
