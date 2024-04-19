import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import config from '../lib/config';
import logger from '../lib/logger';

function main() {
  const sqlite = new Database(config.DATABASE_URL);
  const db = drizzle(sqlite);

  try {
    migrate(db, { migrationsFolder: 'migrations' });
    logger.info('Database migrated ✨');
    sqlite.close();
  } catch (err) {
    logger.error(`Error: ${err}`);
  } finally {
    process.exit(0);
  }
}

main();
