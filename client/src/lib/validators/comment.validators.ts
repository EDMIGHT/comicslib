import { z } from 'zod';

export const createCommentValidation = z.object({
  text: z
    .string()
    .min(1, 'text is a required field')
    .max(255, 'the maximum text length is 255 characters'),
});
