import express from 'express';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/me', authenticate, UserController.getMe);
router.post('/logout', authenticate, AuthController.logout);

export default router;
