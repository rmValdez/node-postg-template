import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5002;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '1d';
export const REFRESH_TOKEN_EXPIRY = '7d';

export const DATABASE_URL = process.env.DATABASE_URL;

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
export const REDIS_TTL_SECONDS = parseInt(process.env.REDIS_TTL_SECONDS || '3600');
export const REDIS_TLS = process.env.REDIS_TLS === 'true';
export const WORKER_HEALTH_PORT = parseInt(process.env.WORKER_HEALTH_PORT || '8080');

export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

/**
 * Service-to-service auth. Each external backend gets its own named key so
 * traffic can be identified/revoked individually instead of sharing one secret.
 *
 * Format: "clientName:key,otherClient:otherKey"
 * Example: "partner-a:8f2c...,internal-billing:1a9d..."
 */
export const API_KEYS: ReadonlyMap<string, string> = new Map(
  (process.env.API_KEYS || '')
    .split(',')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [name, key] = pair.split(':');
      return [key, name] as [string, string];
    }),
);

export const SMTP_HOST = process.env.SMTP_HOST || 'smtp.ethereal.email';
export const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
export const SMTP_USER = process.env.SMTP_USER || '';
export const SMTP_PASS = process.env.SMTP_PASS || '';

/**
 * Comma-separated list of allowed browser origins, e.g.
 * "https://app.example.com,https://admin.example.com". Empty in production
 * means no cross-origin browser access at all — safer than a wildcard.
 */
export const CORS_ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

/**
 * Error tracking (Sentry). Empty = disabled — no DSN means no Sentry.init()
 * call anywhere, so this is a true no-op until you set one.
 */
export const SENTRY_DSN = process.env.SENTRY_DSN || '';

export const isDev = NODE_ENV === 'development';
export const isProd = NODE_ENV === 'production';

/**
 * Fail fast rather than silently serving traffic with insecure defaults.
 */
if (isProd) {
  const insecureDefaults: Record<string, string> = {
    ACCESS_TOKEN_SECRET: 'access-secret',
    REFRESH_TOKEN_SECRET: 'refresh-secret',
  };

  for (const [name, defaultValue] of Object.entries(insecureDefaults)) {
    if (process.env[name] === undefined || process.env[name] === defaultValue) {
      throw new Error(
        `[config] ${name} must be set to a strong, unique value in production — refusing to start with the default.`,
      );
    }
  }
}
