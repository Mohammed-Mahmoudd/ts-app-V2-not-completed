import { z } from 'zod';
import { objectIdSchema } from './validator.util';

export const createSessionValidator = z
  .object({
    student: objectIdSchema,
    instructor: objectIdSchema,
    branch: objectIdSchema,
    type: z.enum(['in-person', 'online', 'theory']),
    startTime: z.date(),
    duration: z.number(),
    status: z
      .enum(['scheduled', 'ongoing', 'completed', 'cancelled', 'missed'])
      .optional(),
    sessionNumber: z.number(),
    totalSessions: z.number(),
  })
  .strict();

export const updateSessionValidator = createSessionValidator.partial();
