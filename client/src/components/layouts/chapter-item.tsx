import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Time } from '@/components/ui/time';
import { cn } from '@/lib/utils';
import { IChapterWithUser } from '@/types/chapter.types';

export const ChapterItem: FC<IChapterWithUser> = ({ id, number, title, user, createdAt }) => {
  return (
    <Card className='flex items-center justify-between gap-2  hover:bg-card/80'>
      <Link href={`/chapter/${id}`} className='flex-1 p-2'>
        <h3>
          Ch. {number} {title && `- ${title}`}
        </h3>
      </Link>
      <div className='flex items-center gap-1'>
        <Link
          href={`/profile/${user.login}`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-1 h-fit w-fit')}
        >
          {user.login}
        </Link>
        <Link href={`/chapter/${id}`} className='p-2'>
          {createdAt && <Time time={new Date(createdAt)} />}
        </Link>
      </div>
    </Card>
  );
};
