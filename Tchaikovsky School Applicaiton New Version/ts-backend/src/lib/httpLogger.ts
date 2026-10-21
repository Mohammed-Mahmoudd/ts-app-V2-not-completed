// import pinoHttp from 'pino-http';
// import { logger } from '@/lib/logger';

// export const httpLogger = pinoHttp({
//   logger,
//   genReqId: (req) => {
//     return (req.headers['x-request-id'] as string) || crypto.randomUUID();
//   },
// });
import pinoHttp from 'pino-http';
import { logger } from './logger';
import crypto from 'crypto';

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) =>
    (req.headers['x-request-id'] as string) || crypto.randomUUID(),

  // Compact request log for dev
  customLogLevel: (_res, _err, _req) => 'debug',

  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
