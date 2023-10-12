import { format, formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

import { formatDistance } from '@/lib/utils';

type NumberOptions = {
  decimals?: number;
};

export class Formatter {
  public static number(number: number | string, options: NumberOptions = {}) {
    const { decimals = 1 } = options;
    const num = Number(number);

    let formattedNumber = '';
    if (num >= 1e3 && num < 1e6) {
      formattedNumber = (num / 1e3).toFixed(decimals) + 'K';
    } else if (num >= 1e6 && num < 1e9) {
      formattedNumber = (num / 1e6).toFixed(decimals) + 'M';
    } else if (num >= 1e9 && num < 1e12) {
      formattedNumber = (num / 1e9).toFixed(decimals) + 'B';
    } else {
      formattedNumber = num.toString();
    }

    return formattedNumber;
  }
  public static time(date: Date): string {
    return format(date, 'PPP');
  }
  public static timeToNow(date: Date): string {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: {
        ...locale,
        formatDistance,
      },
    });
  }
  public static timeForRequest(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }
  public static bytes(
    bytes: number,
    decimals = 0,
    sizeType: 'accurate' | 'normal' = 'normal'
  ): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
      sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
    }`;
  }
}
