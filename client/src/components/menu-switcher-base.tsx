import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { SITE_CONFIG } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

type IMenuSwitcherBaseProps = HTMLAttributes<HTMLDivElement> & {
  onClickBtn?: () => void;
};

export const MenuSwitcherBase: FC<IMenuSwitcherBaseProps> = ({
  onClickBtn,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={cn('items-center gap-2 flex', className)}>
      <button
        onClick={() => onClickBtn && onClickBtn()}
        className='hover:opacity-80 focus:opacity-80'
      >
        <Icons.menu className='h-6 w-6' />
      </button>
      <h2>
        <Link
          href='/'
          className='flex items-center gap-1 text-xl font-bold hover:opacity-80 focus:opacity-80'
        >
          {SITE_CONFIG.name}
          <Icons.logo />
        </Link>
      </h2>
    </div>
  );
};
