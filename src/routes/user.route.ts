import express from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = express.Router();

/**
 * @swagger
 * /v1/users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The current user's profile
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/SuccessResponse' }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get('/me', authenticate, UserController.getMe);

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: List all users (paginated)
 *     description: Requires an ADMIN, SUPER_ADMIN, or DEVELOPER role.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated list of users
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PageResult' }
 *       403:
 *         description: Forbidden — insufficient role
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *   post:
 *     summary: Create a new user
 *     description: Requires an ADMIN, SUPER_ADMIN, or DEVELOPER role.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, username]
 *             properties:
 *               email: { type: string, format: email }
 *               username: { type: string }
 *               name: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/SuccessResponse' }
 *       403:
 *         description: Forbidden — insufficient role
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get(
  '/',
  authenticate,
  requireRole('ADMIN', 'SUPER_ADMIN', 'DEVELOPER'),
  UserController.index,
);
router.post(
  '/',
  authenticate,
  requireRole('ADMIN', 'SUPER_ADMIN', 'DEVELOPER'),
  UserController.create,
);

export default router;
