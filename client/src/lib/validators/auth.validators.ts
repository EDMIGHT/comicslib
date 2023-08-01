import { z } from 'zod';

export const signInValidation = z.object({
  login: z
    .string()
    .min(1, 'login is a required field')
    .min(2, 'the minimum login length is 2 characters')
    .max(190, 'the maximum login length is 190 characters'),
  password: z
    .string()
    .min(1, 'password is a required field')
    .min(5, 'the minimum password length is 5 characters')
    .max(190, 'the maximum password length is 190 characters'),
});
