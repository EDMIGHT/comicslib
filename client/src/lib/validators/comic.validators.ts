import * as z from 'zod';

export const createComicSchema = z.object({
  title: z
    .string()
    .min(2, 'The minimum title length is 2 characters')
    .max(190, 'The maximum title length is 190 characters'),
  statusId: z.string({
    required_error: 'Status must be selected',
  }),
  desc: z
    .string()
    .trim()
    .max(500, 'The maximum description length is 500 characters')
    .optional(),
  img: z.string({
    required_error: 'You must upload a picture for the cover of the comic',
  }),
  authors: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one author',
  }),
  genres: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one genre',
  }),
  themes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one theme',
  }),
  releasedAt: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export type ICreateComicFields = z.infer<typeof createComicSchema>;
