import { CreateUserDto } from "../users/dto/create-user.dto";
import { hash } from "../../lib/utils";
import usersService from "../users/users.service";
import { SigninUserDto } from "./dto/signin-user.dto";

class AuthService {
  async signup(createUserDto: CreateUserDto) {
    const existingUser = await usersService.findOne({
      email: createUserDto.email,
      username: createUserDto.username,
    });

    if (existingUser.length !== 0) return null;

    const hashedPassword = await hash(createUserDto.password);
    return await usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async signin(user: SigninUserDto) {
    const existingUser = await usersService.findOne({ email: user.email });
    if (existingUser.length !== 0) return null;
  }
}

const authService = new AuthService();

export default authService;
