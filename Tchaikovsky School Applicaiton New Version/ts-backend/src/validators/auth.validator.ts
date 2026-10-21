import z from 'zod';
import { instructorSchema, studentSchema, userSchema } from './user.validator';

const registerUserSchema = userSchema.omit({
  status: true,
});

const registerStudentSchema = studentSchema.omit({
  instructors: true,
  theoryMeeting: true,
  practiceMeeting: true,
  location: true,
});

const registerInstructorSchema = instructorSchema;

export const registerValidator = z.discriminatedUnion('role', [
  registerUserSchema
    .extend({ role: z.literal('student'), student: registerStudentSchema })
    .strict(),
  registerUserSchema
    .extend({
      role: z.literal('instructor'),
      instructor: registerInstructorSchema,
    })
    .strict(),
]);

export const loginValidator = z.object({
  phone: z.string(),
  password: z.string(),
});

export const refreshValidator = z.object({
  token: z.jwt(),
});

export const logoutValidator = refreshValidator;
