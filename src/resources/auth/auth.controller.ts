import { Request, Response } from "express";
import authService from "./auth.service";
import { signinUserDto } from "./dto/signin-user.dto";
import { createUserDto } from "../users/dto/create-user.dto";

class AuthController {
  async signup(req: Request, res: Response) {
    const body = createUserDto.safeParse(req.body);
    if (!body.success) return res.sendStatus(400);

    const newUser = await authService.signup(body.data);

    res.status(201);
    res.json({ data: newUser });
  }

  signin(req: Request, res: Response) {
    const body = signinUserDto.safeParse(req.body);
    if (!body.success) return res.sendStatus(400);

    const x = authService.signin(body.data);

    res.sendStatus(200);
  }

  signout(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

const authController = new AuthController();
export default authController;
