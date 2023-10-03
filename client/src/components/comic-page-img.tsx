'use client';

import Image from 'next/image';
import { forwardRef, HTMLAttributes, useState } from 'react';
import { createPortal } from 'react-dom';

import { OverlayModal } from '@/components/overlay-modal';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type ComicPageImgProps = {
  imgSrc: string;
  alt: string;
} & HTMLAttributes<HTMLDivElement>;

export const ComicPageImg = forwardRef<HTMLDivElement, ComicPageImgProps>(
  ({ imgSrc, alt, className, ...rest }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div
          ref={ref}
          {...rest}
          className={cn(
            'relative flex flex-col w-[210px] h-[270px] justify-center shrink-0  gap-1 rounded cursor-pointer group',
            className
          )}
          onClick={() => setOpen(true)}
        >
          <Image
            src={imgSrc}
            alt={alt}
            width={210}
            height={270}
            className='overflow-hidden rounded object-cover object-center transition-all group-hover:brightness-50'
          />
          <span className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:block'>
            <Icons.maximize className=' z-10 h-12 w-12 stroke-white' />
          </span>
        </div>
        {open &&
          createPortal(
            <OverlayModal onClick={() => setOpen(false)}>
              <div className={cn('relative h-[80vh] w-[80vw] max-w-[90vw]', className)}>
                <Image src={imgSrc} alt={alt} fill className=' object-contain object-center' />
              </div>
            </OverlayModal>,
            document.body
          )}
      </>
    );
  }
);

ComicPageImg.displayName = 'ComicPageImg';
