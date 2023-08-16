import { FC } from 'react';

import { BackBtn } from './ui/back-btn';

type PageHeaderProps = {
  children?: React.ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({ children }) => {
  return (
    <div className='flex items-center gap-2 md:gap-4'>
      <BackBtn />
      <h1 className='text-2xl'>{children}</h1>
    </div>
  );
};
