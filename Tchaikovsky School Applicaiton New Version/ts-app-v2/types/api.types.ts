// API Types based on backend models

export type UserRole = 'student' | 'instructor' | 'admin';
export type UserStatus = 'active' | 'paused' | 'frozen' | 'rejected' | 'pending';
export type PreferredLanguage = 'English' | 'Arabic';
export type Gender = 'male' | 'female';
export type LearningMode = 'In-Person' | 'Online' | 'Hybrid';
export type ExperienceLevel = 
  | 'Preliminary'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8';

export type SessionStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'missed';
export type SessionType = 'in-person' | 'online' | 'theory';

// User Types
export interface InstructorData {
  instruments: string[];
  yearsOfExperience?: string;
  certifications?: string;
  certificatesFiles?: string;
  previousInstitutions?: string;
  performanceExpertise?: string[];
  shortBio?: string;
}

export interface StudentData {
  instrument: string;
  learningMode: LearningMode;
  experienceLevel?: ExperienceLevel;
  instructors?: string[];
  theoryMeeting?: string;
  practiceMeeting?: string;
  location?: string;
  specialNotes?: string;
  address?: string;
  referralSource?: string;
  startDate?: string;
  branchLocation?: string;
  motherName?: string;
  motherPhone?: string;
  fatherName?: string;
  fatherPhone?: string;
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  role: UserRole;
  preferredLanguage: PreferredLanguage;
  country: string;
  city: string;
  gender: Gender;
  dateOfBirth?: string;
  profilePicture: string;
  status: UserStatus;
  instructor?: InstructorData;
  student?: StudentData;
  createdAt: string;
  updatedAt: string;
}

// Session Types
export interface Session {
  _id: string;
  instructor: string | User;
  student: string | User;
  startTime: string;
  duration: number;
  status: SessionStatus;
  branch: string | Branch;
  type: SessionType;
  sessionNumber: number;
  totalSessions: number;
  createdAt: string;
  updatedAt: string;
}

// Instrument Types
export interface Instrument {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// Branch Types
export interface Branch {
  _id: string;
  name: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

// Feedback Types
export interface Feedback {
  _id: string;
  session: string | Session;
  user: string | User;
  HWComment?: string;
  HWRating?: number;
  comment: string;
  rating: number;
  isReviewed: boolean;
  adminReply?: string;
  sheetFiles?: string[];
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
  role: UserRole;
  preferredLanguage: PreferredLanguage;
  country: string;
  city: string;
  gender: Gender;
  dateOfBirth?: string;
  instructor?: Partial<InstructorData>;
  student?: Partial<StudentData>;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutRequest {
  token: string;
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalSessions: number;
  totalInstructors: number;
  totalStudents: number;
  activeSessions: number;
  completedSessions: number;
  pendingRequests: number;
  totalFeedbacks: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  requests: any[];
  requestsTotal: number;
  sessions: Session[];
  sessionsTotal: number;
  feedbacks: Feedback[];
  feedbacksTotal: number;
}

// Session Create/Update Types
export interface CreateSessionRequest {
  instructor: string;
  student: string;
  startTime: string;
  duration: number;
  branch: string;
  type: SessionType;
  sessionNumber: number;
  totalSessions: number;
  status?: SessionStatus;
}

export interface UpdateSessionRequest extends Partial<CreateSessionRequest> {}

// Feedback Create Types
export interface CreateFeedbackRequest {
  comment: string;
  rating: number;
  HWComment?: string;
  HWRating?: number;
}

// Instrument Create Types
export interface CreateInstrumentRequest {
  name: string;
}

// Branch Create Types
export interface CreateBranchRequest {
  name: string;
  location: string;
}
