import z from 'zod';

export const createPostDto = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
export type CreatePostDto = z.infer<typeof createPostDto>;
