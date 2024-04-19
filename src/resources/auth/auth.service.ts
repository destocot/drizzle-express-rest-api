import { ConflictError, NotFoundError } from "../../lib/errors";
import logger from "../../lib/logger";
import BcryptUtils from "../../lib/utils/bcrypt.util";
import JwtUtils from "../../lib/utils/jwt.util";
import { CreateUserSchema } from "../users/user.schema";
import usersService from "../users/users.service";
import { SigninSchema } from "./auth.schema";

class AuthService {
  async signup(createUserDto: CreateUserSchema["body"]) {
    const [existingUser] = await usersService.findOne({
      email: createUserDto.email,
      username: createUserDto.username,
    });

    if (existingUser) {
      throw new ConflictError("Email or username already exists");
    }

    const hashedPassword = await BcryptUtils.hash(createUserDto.password);
    return await usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async signin(signinUserDto: SigninSchema["body"]) {
    const [user] = await usersService.findOne({ email: signinUserDto.email }, [
      "updatedAt",
    ]);

    if (!user) {
      logger.debug("User not found");
      throw new NotFoundError("Invalid Credentials");
    }

    const isPasswordValid = await BcryptUtils.compare(
      signinUserDto.password,
      user.password
    );

    if (!isPasswordValid) {
      logger.debug("Password is invalid");
      throw new NotFoundError("Invalid Credentials");
    }

    const accessToken = JwtUtils.sign({ sub: user.id });
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken };
  }
}

const authService = new AuthService();

export default authService;
