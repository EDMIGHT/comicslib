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

export const extractStatusCode = (message: string): number | null => {
  const match = message.match(/code (\d+)/);
  return match ? parseInt(match[1]) : null;
};

export const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const absoluteUrl = (path: string) => {
  return `${process.env.APP_URL}${path}`;
};

export const generatePerPageVariants = (limit: number, numberOfVariants: number): number[] => {
  if (numberOfVariants === 0) {
    return [];
  }

  const variants = generatePerPageVariants(limit, numberOfVariants - 1);
  variants.push(numberOfVariants * limit);
  return variants;
};

export const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}} sec',
  xMinutes: '{{count}} min',
  aboutXHours: '{{count}} hour',
  xHours: '{{count}} hour',
  xDays: '{{count}} days',
  aboutXWeeks: '{{count}} weak',
  xWeeks: '{{count}} weak',
  aboutXMonths: '{{count}} month',
  xMonths: '{{count}} month',
  aboutXYears: '{{count}} year',
  xYears: '{{count}} year',
  overXYears: '{{count}} year',
  almostXYears: '{{count}} year',
};

export const formatDistance = (
  token: keyof typeof formatDistanceLocale,
  count: number,
  options?: {
    addSuffix?: boolean;
    comparison?: number;
  }
): string => {
  options = options || {};

  const result = formatDistanceLocale[token].replace('{{count}}', count.toString());

  if (options.addSuffix) {
    if (options.comparison !== undefined && options.comparison > 0) {
      return 'in ' + result;
    } else {
      if (result === 'just now') return result;
      return result + ' ago';
    }
  }

  return result;
};
