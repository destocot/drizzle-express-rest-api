import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/drizzle/schema.ts',
  out: 'migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
};

export default defineConfig(config);
