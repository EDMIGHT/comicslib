'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type IComicNavigationProps = {
  comicId: string;
};

export const ComicNavigation: FC<IComicNavigationProps> = ({ comicId }) => {
  const pathname = usePathname();

  return (
    <Card className='flex w-fit gap-2 border-none p-1'>
      <Link
        href={`/comics/${comicId}`}
        className={cn(
          buttonVariants({ variant: 'link' }),
          pathname === `/comics/${comicId}` && 'bg-active text-active-foreground'
        )}
      >
        Chapters
      </Link>
      <Link
        href={`/comics/${comicId}/comments`}
        className={cn(
          buttonVariants({ variant: 'link' }),
          pathname === `/comics/${comicId}/comments` && 'bg-active text-active-foreground'
        )}
      >
        Comments
      </Link>
    </Card>
  );
};
