import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type SectionHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

export const SectionHeader: FC<SectionHeaderProps> = ({ children, className, ...rest }) => {
  return (
    <h2 {...rest} className={cn('text-2xl font-medium pl-2', className)}>
      {children}
    </h2>
  );
};
