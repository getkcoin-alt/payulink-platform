import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

/**
 * Global application configuration object.
 * Reads strictly from process.env with secure fallback defaults.
 */
export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || '0.0.0.0',
  jwtSecret: process.env.JWT_SECRET || 'payulink-prod-jwt-secret-key-32chars-min!',
  dbPath: process.env.DATABASE_URL || path.resolve(process.cwd(), 'payulink.db'),
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  openRouterBaseUrl: 'https://openrouter.ai/api/v1',
  openRouterDefaultModel: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free',
  nodeEnv: process.env.NODE_ENV || 'development',
};
