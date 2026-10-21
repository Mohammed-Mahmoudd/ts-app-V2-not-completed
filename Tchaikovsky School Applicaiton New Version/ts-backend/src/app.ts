import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { httpLogger } from '@/lib/httpLogger';
import { logger } from '@/lib/logger';
import allRoutes from '@/routes/index.route';
import helmet from 'helmet';

const app = express();

/* ===== Core middleware ===== */
app.use(cors()); // Enable CORS for all origins (development)
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

/* ===== Routes ===== */
app.use('/api', allRoutes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

/* ===== Global error handler ===== */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(
    {
      err,
    },
    'Unhandled error',
  );

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong',
    },
  });
});

export default app;
