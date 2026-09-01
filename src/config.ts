import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3002;
export const NODE_ENV = process.env.NODE_ENV || "development";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "accesssecret123";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_REFRESH_SECRET || "refreshsecret123";
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || process.env.JWT_EXPIRY || "15m";
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

export const DATABASE_URL = process.env.DATABASE_URL;

export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
export const REDIS_TTL_SECONDS = parseInt(process.env.REDIS_TTL_SECONDS || "3600");

export const CORS_ORIGIN = process.env.CORS_ORIGIN || "";

// AWS S3 / Cloudflare R2 File Storage
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";
export const S3_CDN_URL = process.env.S3_CDN_URL || "";

// SMTP / Nodemailer Email Service
export const MAILER_EMAIL = process.env.MAILER_EMAIL || "";
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD || "";
export const MAILER_FROM_NAME = process.env.MAILER_FROM_NAME || "System";
export const MAILER_TRANSPORT_HOST = process.env.MAILER_TRANSPORT_HOST || "smtp.gmail.com";
export const MAILER_TRANSPORT_PORT = parseInt(process.env.MAILER_TRANSPORT_PORT || "587");
export const MAILER_TRANSPORT_SECURE = process.env.MAILER_TRANSPORT_SECURE === "true";

export const isDev = NODE_ENV === "development";

