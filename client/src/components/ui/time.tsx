import React, { useMemo } from 'react';

import formatTime from '@/lib/helpers/formatTime';
import { cn } from '@/lib/utils';

type TimeProps = {
  time: Date;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const Time: React.FC<TimeProps> = ({ time, children, className, ...rest }) => {
  const formattedTime = formatTime(time);

  return (
    <span {...rest} className={cn('text-sm', className)}>
      {children} {formattedTime}
    </span>
  );
};
