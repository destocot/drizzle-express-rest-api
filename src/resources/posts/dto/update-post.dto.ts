import z from 'zod';

export const updatePostDto = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update (title, content)',
  });

export type UpdatePostDto = z.infer<typeof updatePostDto>;
