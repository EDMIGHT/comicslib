import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { BackBtn } from './ui/back-btn';

type PageHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({ children, className, ...rest }) => {
  return (
    <div className='flex items-center gap-2 md:gap-4'>
      <BackBtn />
      <h1 {...rest} className={cn('text-2xl', className)}>
        {children}
      </h1>
    </div>
  );
};
