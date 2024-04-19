import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { cuid } from "../lib/utils";

/* users */

export const UserTable = sqliteTable("users", {
  id: text("id", { length: 25 }).$default(cuid).primaryKey(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),

  username: text("username", { length: 255 }).notNull().unique(),
  email: text("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
});

export const UserTableRelations = relations(UserTable, ({ many }) => ({
  posts: many(PostTable),
}));

/* posts */

export const PostTable = sqliteTable("posts", {
  id: text("id", { length: 25 }).$default(cuid).primaryKey(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),

  title: text("title", { length: 255 }).notNull(),
  content: text("content").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const PostTableRelations = relations(PostTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PostTable.userId],
    references: [UserTable.id],
  }),
}));
