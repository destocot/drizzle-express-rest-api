import 'dotenv/config';

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};

export default config;
