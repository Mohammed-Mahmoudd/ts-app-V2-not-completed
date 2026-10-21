const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT || 3000;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m'; // 15 minutes
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d'; // 7 days

if (!MONGO_URI) {
  throw new Error('Please provide MONGO_URI in the environment variables');
}

export {
  MONGO_URI,
  PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
};
