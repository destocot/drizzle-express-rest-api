import { SQLWrapper, eq, or } from "drizzle-orm";
import db from "@/drizzle";
import { UserTable } from "@/drizzle/schema";
import { exclude } from "@/lib/utils";
import BcryptUtils from "@/lib/utils/bcrypt.util";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "@/resources/users/user.schema";

class UsersService {
  async create(user: CreateUserSchema["body"]) {
    const cols = exclude(UserTable, ["password", "updatedAt"]);
    return await db.insert(UserTable).values(user).returning(cols);
  }

  async findAll() {
    const cols = exclude(UserTable, ["password", "updatedAt"]);
    return await db.select(cols).from(UserTable);
  }

  async findOne(
    findBy: { id?: string; email?: string; username?: string },
    colsToExclude: Array<keyof typeof UserTable._.columns> = []
  ) {
    const conditions: Array<SQLWrapper | undefined> = [];

    const { id, email, username } = findBy;
    if (id) conditions.push(eq(UserTable.id, id));
    if (email) conditions.push(eq(UserTable.email, email));
    if (username) conditions.push(eq(UserTable.username, username));

    const cols = exclude(UserTable, colsToExclude);

    return await db
      .select(cols)
      .from(UserTable)
      .where(or(...conditions));
  }

  async update(id: string, user: UpdateUserSchema["body"]) {
    const cols = exclude(UserTable, ["password", "updatedAt"]);

    if (user.password) {
      const hashedPassword = await BcryptUtils.hash(user.password);
      user.password = hashedPassword;
    }

    return await db
      .update(UserTable)
      .set(user)
      .where(eq(UserTable.id, id))
      .returning(cols);
  }

  async remove(id: string) {
    const cols = exclude(UserTable, ["password", "updatedAt"]);

    return await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning(cols);
  }
}

const usersService = new UsersService();

export default usersService;
