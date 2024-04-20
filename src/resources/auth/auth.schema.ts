import z from "zod";
import { createSelectSchema } from "drizzle-zod";
import { UserTable } from "@/drizzle/schema";

const signinBody = {
  body: createSelectSchema(UserTable, {
    email: (schema) => schema.email.email(),
    password: (schema) => schema.password.min(1),
  }).pick({
    email: true,
    password: true,
  }),
};

export const signinSchema = z.object({
  ...signinBody,
});

export type SigninSchema = z.infer<typeof signinSchema>;
