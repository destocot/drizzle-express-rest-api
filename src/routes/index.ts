import { Router } from 'express';

import userRoutes from '../resources/users/users.routes';
import authRoutes from '../resources/auth/auth.routes';
import postRoutes from '../resources/posts/posts.routes';

const router = Router();

router.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

router.use('/api/auth', authRoutes);

router.use('/api/users', userRoutes);

router.use('/api/posts', postRoutes);

export default router;
