import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';
import { IComicWithChapter } from '@/types/comic.types';

type LatestUpdatesSectionProps = {
  comics: IComicWithChapter[];
};

type LatestUpdatesSectionBaseProps = HTMLAttributes<HTMLUListElement> &
  LatestUpdatesSectionProps;

const LatestUpdatesSectionBase: FC<LatestUpdatesSectionBaseProps> = ({
  comics,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn('space-y-2 rounded bg-card p-2', className)}>
      {comics.map(({ id, title, img, chapters }) => {
        const firstChapter = chapters[0];
        const formattedDate = Formatter.timeToNow(new Date(firstChapter.createdAt));
        return (
          <li key={id} className='flex gap-2'>
            <Link
              href={`${HREFS.comics}/${id}`}
              className=' shrink-0 hover:brightness-75 focus:brightness-75'
            >
              <Image
                src={img}
                alt={title}
                width={60}
                height={80}
                className='h-[80px] w-[60px] rounded object-cover object-center'
              />
            </Link>
            <div className='flex grow flex-col justify-evenly'>
              <Link
                href={`${HREFS.comics}/${id}`}
                className='group hover:brightness-75 focus:brightness-75'
              >
                <h3 className='line-clamp-1 break-all text-base font-semibold'>{title}</h3>
              </Link>

              <Link
                href={`${HREFS.chapter}/${firstChapter.id}`}
                className='line-clamp-1 break-all text-base hover:brightness-75 focus:brightness-75'
              >
                Ch. {firstChapter.number}
                {firstChapter.title ? ` - ${firstChapter.title}` : ''}
              </Link>
              <div className='flex w-full justify-between gap-1'>
                {firstChapter.user ? (
                  <Link
                    href={`${HREFS.profile}/${firstChapter.user.login}`}
                    className='flex items-center hover:brightness-75 focus:brightness-75'
                  >
                    <Icons.user className='h-5 w-5 shrink-0' />
                    <span className='line-clamp-1 break-all px-1 text-sm'>
                      {firstChapter.user.login}
                    </span>
                  </Link>
                ) : (
                  <div>
                    <Icons.user className='h-5 w-5 shrink-0' />
                    <span className='line-clamp-1 break-all px-1 text-sm'>deleted</span>
                  </div>
                )}
                <span className='whitespace-nowrap text-sm'>{formattedDate}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const LatestUpdatesSection: FC<LatestUpdatesSectionProps> = ({ comics }) => {
  return (
    <div className='grid grid-cols-1 gap-x-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      <LatestUpdatesSectionBase comics={comics.slice(0, 4)} />
      <LatestUpdatesSectionBase comics={comics.slice(4, 8)} className='hidden lg:block' />
      <LatestUpdatesSectionBase comics={comics.slice(8, 12)} className='hidden xl:block' />
      <LatestUpdatesSectionBase comics={comics.slice(12, 16)} className='hidden 2xl:block' />
    </div>
  );
};
