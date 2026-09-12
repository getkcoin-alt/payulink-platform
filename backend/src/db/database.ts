import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initializes and exports the SQLite database instance.
 * Configured with Write-Ahead Logging (WAL) to ensure maximum concurrency
 * and zero read-blocking during high-frequency transaction writes.
 */
export const db = new Database(config.dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');

/**
 * Initializes database schema by reading and executing schema.sql.
 * Safe to run multiple times due to IF NOT EXISTS clauses.
 */
export function initSchema(): void {
  try {
    const candidates = [
      path.resolve(__dirname, 'schema.sql'),
      path.resolve(__dirname, '../../src/db/schema.sql'),
      path.resolve(process.cwd(), 'src/db/schema.sql'),
      path.resolve(process.cwd(), 'backend/src/db/schema.sql')
    ];
    const schemaPath = candidates.find(p => fs.existsSync(p));
    if (schemaPath) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      db.exec(sql);
      logger.info({ schemaPath }, 'Database schema verified and loaded successfully');
    }
  } catch (err) {
    logger.error({ err }, 'Failed to initialize database schema');
    throw err;
  }
}
