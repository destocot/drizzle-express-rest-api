import { Router } from 'express';
import postsController from './posts.controller';

const router = Router();

router.post('/', postsController.createPost);

router.get('/', postsController.retrievePosts);

router.get('/:id', postsController.retrievePost);

router.patch('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

export default router;
