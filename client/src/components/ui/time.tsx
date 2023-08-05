import React, { useMemo } from 'react';

import formatTime from '@/lib/helpers/formatTime';

interface TimeProps {
  time: Date;
  children?: React.ReactNode;
}

export const Time: React.FC<TimeProps> = ({ time, children }) => {
  const formattedTime = formatTime(time);

  return (
    <span className='text-sm'>
      {children} {formattedTime}
    </span>
  );
};
