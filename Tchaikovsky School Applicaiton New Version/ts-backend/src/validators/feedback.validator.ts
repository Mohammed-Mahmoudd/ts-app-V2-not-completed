import { z } from 'zod';

export const addFeedbackValidator = z.object({
  HWComment: z.string().optional(),
  HWRating: z.number().min(1).max(5).optional(),
  comment: z.string(),
  rating: z.number().min(1).max(5),
});

export const updateFeedbackValidator = addFeedbackValidator.partial();
