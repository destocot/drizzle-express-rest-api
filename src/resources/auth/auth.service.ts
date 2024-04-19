import { createUserDto } from '../users/dto/create-user.dto';
import { hash } from '../../lib/utils';
import usersService from '../users/users.service';
import { SigninUserDto } from './dto/signin-user.dto';

class AuthService {
  async signup(reqBody: unknown) {
    const body = createUserDto.safeParse(reqBody);
    if (!body.success) return null;

    const { data: user } = body;

    const existingUser = await usersService.findOneByEmailOrUsername(
      user.email,
      user.username
    );

    if (existingUser.length !== 0) return null;

    const hashedPassword = await hash(user.password);
    return await usersService.create({ ...user, password: hashedPassword });
  }

  async signin(user: SigninUserDto) {
    //  const existingUser = await usersService.findOneByEmailOrUsername(
    //    user.email
    //  );
    //  if (existingUser.length !== 0) return null;
  }
}

const authService = new AuthService();

export default authService;
