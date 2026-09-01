import express from 'express';
import AngularController from '../controllers/angular.controller';

const router = express.Router();

router.get('/', AngularController.index);
router.get('/:slug', AngularController.show);
router.post('/:id/like', AngularController.like);
router.post('/', AngularController.create);

export default router;
