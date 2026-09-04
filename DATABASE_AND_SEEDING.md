# Backend Database, Seeding & CORS Guide

This document details database setup, Prisma seeders, credentials, and CORS configuration for `node-postg-backend-template`.

---

## 🗄️ 1. Database Schema & Setup

The backend uses **Prisma** with **PostgreSQL**.

### Push Schema to Database
To create or update all database tables (`tenants`, `users`, `quiz_questions`, `quiz_progress`, `roles`, etc.):
```bash
npx prisma db push
```

### Seed Database
To populate essential data (tenants, default users, and 100 Flutter quiz questions):
```bash
npx prisma db seed
```

---

## 👤 2. Default Seeded Accounts

All accounts use PBKDF2 with SHA-512 password hashing (`salt:hash`):

| Role | Email | Password | Username |
|---|---|---|---|
| `SUPER_ADMIN` | `superadmin@example.com` | `Password123!` | `superadmin` |
| `SUPER_ADMIN` | `admin@example.com` | `Password123!` | `admin` |
| `DEVELOPER` | `dev@example.com` | `Password123!` | `developer` |
| `USER` | `user@example.com` | `Password123!` | `user1` |

---

## 🌐 3. CORS & Flutter Web Integration

The CORS middleware is configured in [`src/middleware/cors.middleware.ts`](file:///c:/Users/devrm/Documents/GitHub/rm-template/node-postg-backend-template/src/middleware/cors.middleware.ts).

### Allowed Origins
- `http://localhost:8085` (Flutter Web dev server)
- `http://localhost:3000` (Next.js)
- `http://localhost:4200` (Angular)
- `http://localhost:5173` (Vue)
- `http://localhost:4000` (Nuxt)

### Allowed Headers
- `Content-Type`, `Authorization`, `Accept`, `Origin`, `X-Requested-With`
- `x-tenant-slug`, `X-Tenant-Slug`
- `x-session-id`, `X-Session-Id`
- `x-tenant-id`, `X-Tenant-Id`

---

## 🛣️ 4. Key Route Aliases

Both route conventions are supported:
- Direct: `POST /api/v1/login`, `POST /api/v1/register`
- Auth nested: `POST /api/v1/auth/login`, `POST /api/v1/auth/register`
- Quiz questions: `GET /api/v1/quiz/questions`
- Quiz progress: `POST /api/v1/quiz/progress`
