import type { NextFunction, Request, Response } from "express";
import usersService from "./users.service";
import { NotFoundError } from "../../lib/errors";
import {
  CreateUserSchema,
  DeleteUserSchema,
  RetrieveUserSchema,
  UpdateUserSchema,
} from "./user.schema";

class UsersController {
  async createUser(
    req: Request<{}, {}, CreateUserSchema["body"]>,
    res: Response
  ) {
    res.redirect(307, "/api/auth/signup");
  }

  async retrieveUsers(req: Request, res: Response) {
    const users = await usersService.findAll();

    res.status(200);
    res.json({ data: users });
  }

  async retrieveUser(
    req: Request<RetrieveUserSchema["params"]>,
    res: Response,
    next: NextFunction
  ) {
    const { params } = req;

    const user = await usersService.findOne({ id: params.id }, [
      "password",
      "updatedAt",
    ]);
    if (user.length === 0) return next(new NotFoundError("User not found"));

    res.status(200);
    res.json({ data: user });
  }

  async updateUser(
    req: Request<UpdateUserSchema["params"], {}, UpdateUserSchema["body"]>,
    res: Response
  ) {
    const { params, body } = req;

    const updatedUser = await usersService.update(params.id, body);

    res.status(200);
    res.json({ data: updatedUser });
  }

  async deleteUser(req: Request<DeleteUserSchema["params"]>, res: Response) {
    const { params } = req;

    const deletedUser = await usersService.remove(params.id);

    res.status(200);
    res.json({ data: deletedUser });
  }
}

const usersController = new UsersController();

export default usersController;
