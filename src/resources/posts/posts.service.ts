import { and, eq, getTableColumns } from "drizzle-orm";
import db from "../../drizzle";
import { PostTable, UserTable } from "../../drizzle/schema";
import { CreatePostSchema, UpdatePostSchema } from "./posts.schema";

class PostsService {
  async create(userId: string, post: CreatePostSchema["body"]) {
    return await db
      .insert(PostTable)
      .values({ ...post, userId })
      .returning();
  }

  async findAll(userId: string) {
    const { password, ...userCols } = getTableColumns(UserTable);
    const { userId: _, ...postCols } = getTableColumns(PostTable);

    return await db
      .select({
        ...postCols,
        user: userCols,
      })
      .from(PostTable)
      .where(eq(PostTable.userId, userId))
      .leftJoin(UserTable, eq(PostTable.userId, UserTable.id));
  }

  async findOne(userId: string, id: string) {
    const { password, ...userCols } = getTableColumns(UserTable);
    const { userId: _, ...postCols } = getTableColumns(PostTable);

    return await db
      .select({
        ...postCols,
        user: userCols,
      })
      .from(PostTable)
      .where(and(eq(PostTable.userId, userId), eq(PostTable.id, id)))
      .leftJoin(UserTable, eq(PostTable.userId, UserTable.id));
  }

  async update(userId: string, id: string, post: UpdatePostSchema["body"]) {
    return await db
      .update(PostTable)
      .set(post)
      .where(and(eq(PostTable.userId, userId), eq(PostTable.id, id)))
      .returning();
  }

  async remove(userId: string, id: string) {
    return await db
      .delete(PostTable)
      .where(and(eq(PostTable.userId, userId), eq(PostTable.id, id)))
      .returning();
  }
}

const postsService = new PostsService();

export default postsService;
