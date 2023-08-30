import * as z from 'zod';

export const signInValidation = z.object({
  login: z
    .string()
    .trim()
    .min(2, 'The minimum login length is 2 characters')
    .max(190, 'The maximum login length is 190 characters'),
  password: z
    .string()
    .trim()
    .min(5, 'The minimum password length is 5 characters')
    .max(190, 'The maximum password length is 190 characters'),
});

export type ISignInFields = z.infer<typeof signInValidation>;

export const signUpValidation = z
  .object({
    login: z
      .string()
      .trim()
      .min(2, 'The minimum login length is 2 characters')
      .max(190, 'The maximum login length is 190 characters'),
    name: z
      .string()
      .trim()
      .min(2, 'The minimum name length is 2 characters')
      .max(190, 'The maximum name length is 190 characters')
      .optional()
      .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
    password: z
      .string()
      .trim()
      .min(5, 'The minimum password length is 5 characters')
      .max(190, 'The maximum password length is 190 characters'),
    confirmPassword: z
      .string()
      .trim()
      .min(5, 'The minimum confirm password length is 5 characters')
      .max(190, 'The maximum confirm password length is 190 characters'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match',
  });

export type ISignUpFields = z.infer<typeof signUpValidation>;
