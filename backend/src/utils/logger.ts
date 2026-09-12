import pino from 'pino';

/**
 * Structured application logger.
 * Uses pino for minimal overhead asynchronous JSON logging in production
 * and human-readable pretty-printing in development.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss'
    }
  } : undefined
});
