import * as z from 'zod';

const credentialsValidation = z.object({
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

export const signInValidation = credentialsValidation;

export type ISignInFields = z.infer<typeof signInValidation>;

export const signUpValidation = credentialsValidation
  .extend({
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

export const signUpRequestValidation = credentialsValidation;
