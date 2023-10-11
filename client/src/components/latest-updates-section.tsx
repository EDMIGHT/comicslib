import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { formatTimeToNow } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type LatestUpdatesSectionProps = {
  comics: IResponseComic[];
};

type LatestUpdatesSectionBaseProps = HTMLAttributes<HTMLUListElement> & {
  comics: IResponseComic[];
};

const LatestUpdatesSectionBase: FC<LatestUpdatesSectionBaseProps> = ({
  comics,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn('space-y-2 rounded bg-card p-2', className)}>
      {comics.map(({ id, title, img, authors, updatedAt }) => (
        <li key={id}>
          <Link
            href={`${HREFS.comics}/${id}`}
            className='flex gap-2 hover:brightness-75 focus:brightness-75'
          >
            <Image
              src={img}
              alt={title}
              width={60}
              height={80}
              className='h-[80px] w-[60px] shrink-0 rounded object-cover object-center'
            />
            <div className='flex grow flex-col justify-evenly'>
              <h3 className='line-clamp-1 break-all text-base font-semibold'>{title}</h3>

              <p className='line-clamp-1 break-all text-base'>Ch. 1 - sadsad</p>
              <div className='flex w-full justify-between gap-1'>
                <div className='flex items-center'>
                  <Icons.group className='h-5 w-5 shrink-0' />
                  <span className='line-clamp-1 break-all px-1 text-sm italic'>
                    {authors.map(({ login }) => login).join(', ')}
                  </span>
                </div>
                <span className='whitespace-nowrap text-sm'>
                  {formatTimeToNow(new Date(updatedAt))}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const LatestUpdatesSection: FC<LatestUpdatesSectionProps> = ({ comics }) => {
  return (
    <div className='grid grid-cols-4 gap-2'>
      <LatestUpdatesSectionBase comics={comics.slice(0, 6)} />
      <LatestUpdatesSectionBase comics={comics.slice(6, 12)} />
      <LatestUpdatesSectionBase comics={comics.slice(12, 18)} />
      <LatestUpdatesSectionBase comics={comics.slice(18, 24)} />
    </div>
  );
};
