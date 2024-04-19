import { Router } from 'express';

import authController from './auth.controller';
const router = Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

export default router;
