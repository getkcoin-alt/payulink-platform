import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';
import { initSchema, db } from './db/database.js';
import { seedDatabase } from './db/seed.js';
import { authRoutes } from './modules/auth/authRoutes.js';
import { merchantRoutes } from './modules/merchant/merchantRoutes.js';
import { adminRoutes } from './modules/admin/adminRoutes.js';
import { matchingRoutes } from './modules/matching/matchingRoutes.js';
import { OpenRouterClient } from './modules/ai/openRouterClient.js';

/**
 * Initializes and starts the PayuLink Fastify backend application.
 */
async function bootstrap(): Promise<void> {
  // Initialize database schema
  initSchema();

  // Auto-seed baseline data if admin_users is empty
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as any;
    if (!row || row.count === 0) {
      logger.info('Empty database detected on bootstrap; auto-seeding baseline records...');
      seedDatabase();
    }
  } catch (err) {
    logger.warn({ err }, 'Auto-seed check encountered warning; running seedDatabase');
    seedDatabase();
  }

  const fastify = Fastify({
    loggerInstance: logger,
    disableRequestLogging: false
  });

  // Enable CORS
  await fastify.register(cors, {
    origin: true,
    credentials: true
  });

  // Register JWT
  await fastify.register(jwt, {
    secret: config.jwtSecret
  });

  // Health check endpoint
  fastify.get('/health', async () => ({
    status: 'ok',
    service: 'payulink-backend',
    version: '2.4.0',
    timestamp: new Date().toISOString()
  }));

  // AI Arbitration Test Endpoint
  fastify.post('/api/ai/arbitrate', async (request) => {
    const { utr = '625410982343', bankStatus = 'Credit Confirmed', amount = 101 } = request.body as any || {};
    const decision = await OpenRouterClient.arbitrateDispute(utr, bankStatus, amount);
    return { code: 0, msg: 'success', data: decision };
  });

  // Register Core API Route Modules
  await fastify.register(authRoutes, { prefix: '/api' });
  await fastify.register(merchantRoutes, { prefix: '/api' });
  await fastify.register(adminRoutes, { prefix: '/api' });
  await fastify.register(matchingRoutes, { prefix: '/api' });

  // Start listening
  try {
    const address = await fastify.listen({
      port: config.port,
      host: config.host
    });
    logger.info(`PayuLink Backend Server listening on ${address}`);
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

bootstrap();
