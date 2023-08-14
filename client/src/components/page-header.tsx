import { FC } from 'react';

import { BackBtn } from './ui/back-btn';

type PageHeaderProps = {
  title: string;
};

export const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className='flex items-center gap-2 md:gap-4'>
      <BackBtn />
      <h1 className='text-2xl'>{title}</h1>
    </div>
  );
};
