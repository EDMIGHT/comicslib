import { z } from 'zod';

export const createCommentValidation = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Comment text cannot be less than 1 character')
    .max(255, 'the maximum text length is 255 characters'),
});
