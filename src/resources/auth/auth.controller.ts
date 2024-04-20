import { NextFunction, Request, Response } from "express";
import authService from "@/resources/auth/auth.service";
import { CreateUserSchema } from "@/resources/users/user.schema";
import { SigninSchema } from "@/resources/auth/auth.schema";

class AuthController {
  async signup(
    req: Request<{}, {}, CreateUserSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;
    try {
      const newUser = await authService.signup(body);

      res.status(201);
      res.json({ data: newUser });
    } catch (err) {
      next(err);
    }
  }

  async signin(
    req: Request<{}, {}, SigninSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    try {
      const userWithAccessToken = await authService.signin(body);
      res.status(200);
      res.setHeader("x-access-token", userWithAccessToken.accessToken);
      res.json({ data: userWithAccessToken });
    } catch (err) {
      next(err);
    }
  }

  signout(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

const authController = new AuthController();
export default authController;
