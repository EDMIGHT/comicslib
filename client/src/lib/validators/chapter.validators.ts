import * as z from 'zod';

export const createChapterSchema = z.object({
  title: z
    .string()
    .min(2, 'Chapter title cannot be less than 2 characters')
    .max(190, 'Chapter title cannot be more than 190 characters')
    .optional()
    .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
  number: z
    .number({
      invalid_type_error: 'The chapter number can only be a number',
      required_error: 'You must enter the chapter number',
    })
    .nonnegative('The chapter number can only be a positive number (including zero)'),
  pages: z
    .array(
      z.object({
        id: z.string(),
        img: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'you must add at least 1 page to the chapter',
    }),
});

export type ICreateChapterFields = z.infer<typeof createChapterSchema>;
