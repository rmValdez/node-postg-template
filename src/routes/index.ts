import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import fileUploadRoute from './fileUpload.route';
import angularRoute from './angular.route';
import quizRoute from './quiz.routes';

const router = express.Router();

router.get('/v1', (_, res) => {
  res.json({
    message: 'Welcome to node-postg-template API',
  });
});

router.use('/v1/auth', authRoute);
router.use('/v1/users', userRoute);
router.use('/v1/angular', angularRoute);
router.use('/v1/quiz', quizRoute);
router.use('/v1/file-uploads', fileUploadRoute);

export default router;
