import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { UserTable } from "@/drizzle/schema";

const createUserBody = {
  body: createInsertSchema(UserTable, {
    email: (schema) => schema.email.email(),
    username: (schema) => schema.username.min(1),
    password: (schema) => schema.password.min(1),
  }).pick({
    email: true,
    username: true,
    password: true,
  }),
};

const updateUserBody = {
  body: createInsertSchema(UserTable, {
    email: (schema) => schema.email.email().optional(),
    username: (schema) => schema.username.min(1).optional(),
    password: (schema) => schema.password.min(1).optional(),
  })
    .pick({
      email: true,
      username: true,
      password: true,
    })
    .refine((data) => Object.keys(data).length > 0, {
      message:
        "At least one field must be provided to update (email, username, password)",
    }),
};

const params = {
  params: createSelectSchema(UserTable, {
    id: (schema) => schema.id.cuid2(),
  }).pick({ id: true }),
};

export const createUserSchema = z.object({
  ...createUserBody,
});

export const retrieveUserSchema = z.object({
  ...params,
});

export const updateUserSchema = z.object({
  ...params,
  ...updateUserBody,
});

export const deleteUserSchema = z.object({
  ...params,
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type RetrieveUserSchema = z.infer<typeof retrieveUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
