import z from 'zod';

export const createUserDto = z.object({
  email: z.string().email().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});
export type CreateUserDto = z.infer<typeof createUserDto>;
