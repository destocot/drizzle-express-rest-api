import { Router } from 'express';
import usersController from './users.controller';

const router = Router();

router.post('/', usersController.createUser);

router.get('/', usersController.retrieveUsers);

router.get('/:id', usersController.retrieveUser);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

export default router;
