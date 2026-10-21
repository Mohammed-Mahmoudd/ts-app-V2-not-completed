import mongoose from 'mongoose';
import { logger } from './logger';
import { MONGO_URI } from '@/config';

export const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  logger.info(`MongoDB Connected: ${conn.connection.host}`);
};
