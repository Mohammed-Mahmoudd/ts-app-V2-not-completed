/// <reference path="./types/express.d.ts" />
import dotenv from 'dotenv';
dotenv.config();
import app from '@/app';
import { PORT } from './config';
import { logger } from './lib/logger';
import { connectDB } from './lib/db';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT} 🚀`);
    });
  })
  .catch((error) => {
    logger.error('❌ Failed to start server: ' + error);
    process.exit(1);
  });
