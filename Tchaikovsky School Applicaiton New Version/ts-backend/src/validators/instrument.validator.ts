import z from 'zod';
import { objectIdSchema } from './validator.util';

export const createInstrumentValidator = z
  .object({
    name: z.string(),
  })
  .strict();

export const deleteInstrumentValidator = z
  .object({
    id: objectIdSchema,
  })
  .strict();
