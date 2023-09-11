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

export const combineString = (value: unknown) => {
  if (typeof value === 'string') {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(',');
  } else {
    return '';
  }
};

export const getRandomNumber = ({
  min = 0,
  max = 10,
  inclusive = false,
}: {
  min: number;
  max: number;
  inclusive?: boolean;
}): number => {
  if (inclusive) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};

export const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const absoluteUrl = (path: string) => {
  return `${process.env.APP_URL}${path}`;
};

export const formatBytes = (
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal'
) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
};
