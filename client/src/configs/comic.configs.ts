import { IConfigVariant } from '@/types/configs.types';

export const COMIC_RATING_CONFIG = {
  min: 1,
  max: 10,
} as const;

export const COMIC_DATE_FIELDS: readonly IConfigVariant[] = [
  {
    title: 'Added',
    field: 'createdAt',
  },
  {
    title: 'Updated',
    field: 'updatedAt',
  },
  {
    title: 'Released',
    field: 'releasedAt',
  },
];
