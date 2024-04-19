import z from 'zod';

export const signinUserDto = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export type SigninUserDto = z.infer<typeof signinUserDto>;
