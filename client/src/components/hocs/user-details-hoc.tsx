import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { IShortUserWithCounts } from '@/types/user.types';

type UserDetailsHocProps = {
  children: ReactNode;
  user: IShortUserWithCounts;
};

export const UserDetailsHoc: FC<UserDetailsHocProps> = ({
  children,
  user: {
    img,
    login,
    _count: { chapters, comments, ratings },
  },
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className='min-w-[240px] space-y-3 p-4'>
        <Link
          className='flex items-center gap-3 transition-all hover:brightness-75'
          href={`${HREFS.profile}/${login}`}
        >
          <UserAvatar img={img} login={login} className='h-16 w-16' />
          <h3 className='line-clamp-2 h-fit break-words p-0 text-xl font-medium'>{login}</h3>
        </Link>
        <Separator />
        <ul className='flex justify-between gap-2'>
          <li>
            <Link href={`${HREFS.profile}/${login}`} className='group'>
              <span className='block font-medium'>{Formatter.number(ratings)}</span>
              <h5 className='text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
                Rated
              </h5>
            </Link>
          </li>
          <li>
            <Link href={`${HREFS.profile}/${login}/uploads`} className='group'>
              <span className='block font-medium'>{Formatter.number(chapters)}</span>
              <h5 className='text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
                Uploaded
              </h5>
            </Link>
          </li>
          <li>
            <span className='font-medium'>{Formatter.number(comments)}</span>
            <h5 className='text-xs text-muted-foreground'>Comments</h5>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};
