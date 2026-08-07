import dotenv from 'dotenv';
dotenv.config();

// Must be imported before app.ts (and therefore express) so Sentry's
// auto-instrumentation can patch modules before they're required.
import { Sentry } from './instrument';

import http from 'http';
import app from './app';
import logger from './utils/logger';
import { PORT, NODE_ENV, isDev } from './config';
import { prisma } from './utils/prisma';
import { redis } from './infrastructure/redis';
import { rabbitmq } from './infrastructure/rabbitmq';

const server = http.createServer(app);

server.listen(Number(PORT), '0.0.0.0', () => {
  logger.info(`Server running in ${NODE_ENV} mode`);
  logger.info(`  ➜  Local:  http://localhost:${PORT}/api`);
  if (isDev) {
    logger.info(`  ➜  Docs:   http://localhost:${PORT}/api/docs`);
  }
});

const gracefulShutdown = async (signal: string) => {
  logger.info(`[Shutdown] ${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new connections
  server.close(async (err) => {
    if (err) {
      logger.error('[Shutdown] Error closing HTTP server:', err);
      process.exit(1);
    }

    try {
      // 2. Disconnect from all infrastructure
      await redis.close();
      await rabbitmq.close();
      await prisma.$disconnect();

      logger.info('[Shutdown] All connections closed. Goodbye.');
      process.exit(0);
    } catch (shutdownError) {
      logger.error('[Shutdown] Error during cleanup:', shutdownError);
      process.exit(1);
    }
  });

  // Force exit if graceful shutdown takes too long
  setTimeout(() => {
    logger.error('[Shutdown] Graceful shutdown timed out. Forcing exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error('[Process] Unhandled Rejection:', reason);
  Sentry.captureException(reason);
});

process.on('uncaughtException', (error) => {
  logger.error('[Process] Uncaught Exception:', error);
  Sentry.captureException(error);
  process.exit(1);
});
