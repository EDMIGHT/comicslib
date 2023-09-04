import * as z from 'zod';

export const createUserFolder = z.object({
  title: z
    .string()
    .min(2, 'The minimum title length is 2 characters')
    .max(190, 'The maximum title length is 190 characters'),
  comics: z.array(z.string()),
});

export type ICreateUserFolderFields = z.infer<typeof createUserFolder>;
