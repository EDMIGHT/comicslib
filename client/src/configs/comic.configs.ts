import { IConfigVariant, ISortVariant } from '@/types/configs.types';

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

export const COMIC_SORT_VARIANTS: readonly ISortVariant[] = [
  {
    label: 'Title: A to Z',
    field: 'title',
    order: 'asc',
  },
  {
    label: 'Title: Z to A',
    field: 'title',
    order: 'desc',
  },
  {
    label: 'Top: Best to worse',
    field: 'best',
    order: 'desc',
  },
  {
    label: 'Top: Worse to best',
    field: 'best',
    order: 'asc',
  },
  {
    label: 'Popular: Best to worse',
    field: 'popular',
    order: 'desc',
  },
  {
    label: 'Popular: Worse to best',
    field: 'popular',
    order: 'asc',
  },
  {
    label: 'Date Added: New to old',
    field: 'createdAt',
    order: 'desc',
  },
  {
    label: 'Date Added: Old to new',
    field: 'createdAt',
    order: 'asc',
  },
  {
    label: 'Update Date: New to old',
    field: 'updatedAt',
    order: 'desc',
  },
  {
    label: 'Update Date: Old to new',
    field: 'updatedAt',
    order: 'asc',
  },
  {
    label: 'Release date: New to old',
    field: 'releasedAt',
    order: 'desc',
  },
  {
    label: 'Release date: Old to new',
    field: 'releasedAt',
    order: 'asc',
  },
];
