import { Schema, model, Types, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  phone: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  preferredLanguage: 'English' | 'Arabic';
  country: string;
  city: string;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  profilePicture: string;

  status: 'active' | 'paused' | 'frozen' | 'rejected' | 'pending';

  // Instructor Specific Fields
  instructor?: {
    instruments: Types.ObjectId[];

    yearsOfExperience?: string;
    certifications?: string;
    certificatesFiles?: string;
    previousInstitutions?: string;
    performanceExpertise?: string[];
    shortBio?: string;
  };

  // Student Specific Fields
  student?: {
    instrument: Types.ObjectId;
    learningMode: 'In-Person' | 'Online' | 'Hybrid';
    experienceLevel?:
      | 'Preliminary'
      | 'Grade 1'
      | 'Grade 2'
      | 'Grade 3'
      | 'Grade 4'
      | 'Grade 5'
      | 'Grade 6'
      | 'Grade 7'
      | 'Grade 8';
    instructors?: Types.ObjectId[];

    theoryMeeting?: string;
    practiceMeeting?: string;
    location?: string;

    specialNotes?: string;
    address?: string;
    referralSource?: string;
    startDate?: Date;
    branchLocation?: Types.ObjectId;

    motherName?: string;
    motherPhone?: string;
    fatherName?: string;
    fatherPhone?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: 8,
      maxLength: 30,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      required: true,
    },
    preferredLanguage: {
      type: String,
      enum: ['English', 'Arabic'],
      required: true,
    },
    country: { type: String },
    city: { type: String },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: Date },
    profilePicture: { type: String },

    status: {
      type: String,
      enum: ['active', 'paused', 'frozen', 'rejected', 'pending'],
      default: 'pending',
    },

    // Instructor Specific Fields
    instructor: {
      instruments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
        default: undefined,
      },
      yearsOfExperience: { type: String },
      certifications: { type: String },
      certificatesFiles: { type: String },
      previousInstitutions: { type: String },
      performanceExpertise: { type: [String], default: undefined },
      shortBio: { type: String },
    },

    // Student Specific Fields
    student: {
      instrument: { type: Schema.Types.ObjectId, ref: 'Instrument' },
      learningMode: {
        type: String,
        enum: ['In-Person', 'Online', 'Hybrid'],
      },
      experienceLevel: {
        type: String,
        enum: [
          'Preliminary',
          'Grade 1',
          'Grade 2',
          'Grade 3',
          'Grade 4',
          'Grade 5',
          'Grade 6',
          'Grade 7',
          'Grade 8',
        ],
      },
      instructors: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: undefined,
      },
      theoryMeeting: String,
      practiceMeeting: String,
      location: String,
      specialNotes: String,
      address: String,
      referralSource: String,
      startDate: Date,
      branchLocation: { type: Schema.Types.ObjectId, ref: 'Branch' },
      motherName: String,
      motherPhone: String,
      fatherName: String,
      fatherPhone: String,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser, UserModel>('User', userSchema);
