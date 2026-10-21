import { z } from 'zod';
import { objectIdSchema, phoneSchema } from './validator.util';

export const userSchema = z
  .object({
    role: z.enum(['student', 'instructor']),
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must be at most 30 characters long'),
    phone: phoneSchema,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(30, 'Password must be at most 30 characters long'),
    preferredLanguage: z.enum(['English', 'Arabic']).default('English'),
    country: z
      .string()
      .min(3, 'Country must be at least 3 characters long')
      .max(30, 'Country must be at most 30 characters long')
      .optional(),
    city: z
      .string()
      .min(3, 'City must be at least 3 characters long')
      .max(30, 'City must be at most 30 characters long')
      .optional(),
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.date().optional(),
    status: z
      .enum(['active', 'paused', 'frozen', 'rejected', 'pending'])
      .optional(),
  })
  .strict();

export const studentSchema = z
  .object({
    instrument: objectIdSchema,
    learningMode: z.enum(['In-Person', 'Online', 'Hybrid']),
    experienceLevel: z
      .enum([
        'Preliminary',
        'Grade 1',
        'Grade 2',
        'Grade 3',
        'Grade 4',
        'Grade 5',
        'Grade 6',
        'Grade 7',
        'Grade 8',
      ])
      .optional(),
    instructors: z.array(objectIdSchema).optional(),
    theoryMeeting: z.string().optional(),
    practiceMeeting: z.string().optional(),
    location: z.string().optional(),
    specialNotes: z.string().optional(),
    address: z.string().optional(),
    referralSource: z.string().optional(),
    startDate: z.date().optional(),
    branchLocation: objectIdSchema.optional(),
    motherName: z.string().optional(),
    motherPhone: phoneSchema.optional(),
    fatherName: z.string().optional(),
    fatherPhone: phoneSchema.optional(),
  })
  .strict();

export const instructorSchema = z
  .object({
    instruments: z.array(objectIdSchema),
    yearsOfExperience: z.string().optional(),
    certifications: z.string().optional(),
    certificatesFiles: z.string().optional(),
    previousInstitutions: z.string().optional(),
    performanceExpertise: z.array(z.string()).optional(),
    shortBio: z.string().optional(),
  })
  .strict();
