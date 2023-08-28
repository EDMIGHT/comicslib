import * as z from 'zod';

export const createAuthorSchema = z.object({
  login: z
    .string()
    .min(2, 'The minimum login length is 2 characters')
    .max(190, 'The maximum login length is 190 characters')
    .trim(),
  name: z
    .string()
    .min(2, 'The minimum name length is 2 characters')
    .max(190, 'The maximum name length is 190 characters')
    .trim()
    .optional(),
});

export type ICreateAuthorFields = z.infer<typeof createAuthorSchema>;
