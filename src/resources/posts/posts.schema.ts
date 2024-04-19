import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { PostTable } from "../../drizzle/schema";

const createPostBody = {
  body: createInsertSchema(PostTable, {
    title: z.string().min(1).max(255),
    content: z.string().min(1),
  }).pick({
    title: true,
    content: true,
  }),
};

const updatePostBody = {
  body: z
    .object({
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided to update (title, content)",
    }),
};

const params = {
  params: z.object({
    id: z.string().cuid2(),
  }),
};

export const createPostSchema = z.object({
  ...createPostBody,
});

export const retrievePostSchema = z.object({
  ...params,
});

export const updatePostSchema = z.object({
  ...params,
  ...updatePostBody,
});

export const deletePostSchema = z.object({
  ...params,
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type RetrievePostSchema = z.infer<typeof retrievePostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
export type DeletePostSchema = z.infer<typeof deletePostSchema>;
