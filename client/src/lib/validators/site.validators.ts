import * as z from 'zod';

export const ogImageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  mode: z.enum(['light', 'dark']).default('dark'),
});

export const comicOgImageSchema = z.object({
  comicId: z.string(),
});

export const ItemsPerPageSchema = z.object({
  comicsPerPage: z.number().refine((num) => num % 2 === 0, {
    message: 'The number of comics on the page must be even',
  }),
  usersPerPage: z.number().refine((num) => num % 2 === 0, {
    message: 'The number of users on the page must be even',
  }),
});

export type IItemsPerPageSchema = z.infer<typeof ItemsPerPageSchema>;
