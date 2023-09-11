import * as z from 'zod';

export const createUserFolderSchema = z.object({
  title: z
    .string()
    .min(2, 'The minimum title length is 2 characters')
    .max(190, 'The maximum title length is 190 characters'),
  comics: z.array(z.string()),
});

export type ICreateUserFolderSchema = z.infer<typeof createUserFolderSchema>;

export const editFolderSchema = z.object({
  title: z
    .string()
    .min(2, 'The minimum title length is 2 characters')
    .max(190, 'The maximum title length is 190 characters'),
  comics: z.array(z.string()),
});

export type IEditFolderSchema = z.infer<typeof editFolderSchema>;

export const editProfileSchema = z.object({
  img: z.string().optional(),
  login: z
    .string()
    .trim()
    .min(2, 'The minimum login length is 2 characters')
    .max(190, 'The maximum login length is 190 characters')
    .optional(),
});

export type IEditProfileSchema = z.infer<typeof editProfileSchema>;
