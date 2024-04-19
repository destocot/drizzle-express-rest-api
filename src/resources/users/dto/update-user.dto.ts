import z from 'zod';

export const updateUserDto = z
  .object({
    email: z.string().email().min(1).optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message:
      'At least one field must be provided to update (email, username, password)',
  });

export type UpdateUserDto = z.infer<typeof updateUserDto>;
