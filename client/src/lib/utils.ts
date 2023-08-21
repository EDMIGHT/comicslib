import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SITE_CONFIG } from '@/configs/site.configs';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isServer = typeof window === 'undefined';

export const createTitle = (title: string) => `${title} • ${SITE_CONFIG.name}`;

export const isMacOS = () =>
  typeof window !== 'undefined' && window.navigator.userAgent.includes('Mac');

export const arrayFromRange = (min: number, max: number): number[] => {
  return Array.from({ length: max - min + 1 }, (_, index) => index + min);
};

export const combineString = (value: string | string[] | unknown) => {
  if (typeof value === 'string') {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(',');
  } else {
    return '';
  }
};

export const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);
