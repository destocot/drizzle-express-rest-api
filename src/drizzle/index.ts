import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import config from '../lib/config';

const sqlite = new Database(config.DATABASE_URL);

const db = drizzle(sqlite, { schema, logger: true });

export default db;
