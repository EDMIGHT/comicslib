'use client';

import Image from 'next/image';
import { FC, HTMLAttributes, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type ComicPageImgProps = {
  imgSrc: string;
  alt: string;
} & HTMLAttributes<HTMLDivElement>;

export const ComicPageImg: FC<ComicPageImgProps> = ({ imgSrc, alt, className, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        {...rest}
        className={cn(
          'relative flex h-[270px] w-[210px] flex-col gap-1 rounded cursor-pointer group',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className='rounded transition-all group-hover:brightness-50'
        />
        <span className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:block'>
          <Icons.maximize className=' z-20 h-12 w-12 stroke-white' />
        </span>
      </div>
      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            className='fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/70'
          >
            <div className={cn('relative h-[80vh] w-[80vw] max-w-[90vw]', className)}>
              <Image src={imgSrc} alt={alt} fill className=' object-contain object-center' />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
