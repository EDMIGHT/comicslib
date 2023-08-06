'use client';

import Link from 'next/link';

import { SITE_CONFIG } from '@/configs/site.configs';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useActions } from '@/hooks/use-actions';

import { Icons } from './icons';

export const MenuSwitcher = () => {
  const { isActiveMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMenu } = useActions();

  return !isActiveMenu ? (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => setIsActiveMenu(!isActiveMenu)}
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
  ) : null;
};
