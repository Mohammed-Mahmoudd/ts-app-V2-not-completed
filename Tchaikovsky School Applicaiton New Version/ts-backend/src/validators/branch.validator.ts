import z from 'zod';
import { objectIdSchema } from './validator.util';

export const createBranchValidator = z
  .object({
    name: z.string(),
    location: z.url(),
  })
  .strict();

export const deleteBranchValidator = z
  .object({
    id: objectIdSchema,
  })
  .strict();
