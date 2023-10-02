import { FC, HTMLAttributes } from 'react';

import { BackBtn } from '@/components/ui/back-btn';
import { cn } from '@/lib/utils';

type PageHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({ children, className, ...rest }) => {
  return (
    <div className='flex items-center gap-1 md:gap-2'>
      <BackBtn />
      <h1 {...rest} className={cn('text-xl md:text-2xl', className)}>
        {children}
      </h1>
    </div>
  );
};
