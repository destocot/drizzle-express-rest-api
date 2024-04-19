import type { Request, Response } from 'express';
import usersService from './users.service';
import { updateUserDto } from './dto/update-user.dto';

class UsersController {
  async createUser(req: Request, res: Response) {
    res.redirect(307, '/api/auth/signup');
  }

  async retrieveUsers(req: Request, res: Response) {
    const users = await usersService.findAll();

    res.status(200);
    res.json({ data: users });
  }

  async retrieveUser(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) return res.sendStatus(400);

    const user = await usersService.findOne(userId);
    if (user.length === 0) return res.sendStatus(404);

    res.status(200);
    res.json({ data: user });
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) return res.sendStatus(400);

    const body = updateUserDto.safeParse(req.body);
    if (!body.success) return res.sendStatus(400);

    const updatedUser = await usersService.update(userId, body.data);

    res.status(200);
    res.json({ data: updatedUser });
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) return res.sendStatus(400);

    const deletedUser = await usersService.remove(userId);

    res.status(200);
    res.json({ data: deletedUser });
  }
}

const usersController = new UsersController();

export default usersController;
