'use client';

import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type CloseModalRouterProps = HTMLAttributes<HTMLButtonElement>;

export const CloseModalRouter: FC<CloseModalRouterProps> = ({ className, ...rest }) => {
  const router = useRouter();

  return (
    <button
      {...rest}
      className={cn('absolute right-5 top-5', className)}
      onClick={() => router.back()}
    >
      <Icons.close />
    </button>
  );
};
