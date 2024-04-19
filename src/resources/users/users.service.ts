import { BinaryOperator, SQLWrapper, eq, or } from "drizzle-orm";
import db from "../../drizzle";
import { UserTable } from "../../drizzle/schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { exclude, hash } from "../../lib/utils";

class UsersService {
  async create(user: CreateUserDto) {
    const cols = exclude(UserTable, [UserTable.password]);
    return await db.insert(UserTable).values(user).returning(cols);
  }

  async findAll() {
    const cols = exclude(UserTable, [UserTable.password]);
    return await db.select(cols).from(UserTable);
  }

  async findOne({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }) {
    const cols = exclude(UserTable, [UserTable.password]);

    const conditions: SQLWrapper[] = [];

    if (id) conditions.push(eq(UserTable.id, id));
    if (email) conditions.push(eq(UserTable.email, email));
    if (username) conditions.push(eq(UserTable.username, username));

    return await db
      .select(cols)
      .from(UserTable)
      .where(or(...conditions));
  }

  async update(id: string, user: UpdateUserDto) {
    const cols = exclude(UserTable, [UserTable.password]);

    if (user.password) {
      const hashedPassword = await hash(user.password);
      user.password = hashedPassword;
    }

    return await db
      .update(UserTable)
      .set(user)
      .where(eq(UserTable.id, id))
      .returning(cols);
  }

  async remove(id: string) {
    const cols = exclude(UserTable, [UserTable.password]);

    return await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning(cols);
  }
}

const usersService = new UsersService();

export default usersService;
