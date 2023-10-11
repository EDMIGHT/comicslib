'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { CarouselDotButtons } from '@/components/ui/carousel-dot-buttons';
import { HREFS } from '@/configs/href.configs';
import { useDotButton } from '@/hooks/use-dot-carousel-buttons';
import { IResponseComic } from '@/types/comic.types';

type SeveralSmallComicsCarouselProps = {
  comics: IResponseComic[];
};

export const SeveralSmallComicsCarousel: FC<SeveralSmallComicsCarouselProps> = ({
  comics,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className='space-y-2'>
      <div ref={emblaRef} className='overflow-hidden'>
        <ul
          className='flex touch-pan-y'
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {comics.map(({ id, img, title }) => (
            <li key={id} className='mr-4 min-w-0 flex-[0_0_128px] '>
              <Link
                href={`${HREFS.comics}/${id}`}
                className='grid grid-rows-[180px_auto] gap-2 hover:brightness-75 focus:brightness-75'
              >
                <Image
                  src={img}
                  alt={title}
                  height={180}
                  width={128}
                  className='h-[180px] w-[128px] rounded object-cover object-center'
                />
                <h3 className='line-clamp-2 break-words text-sm font-medium'>{title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CarouselDotButtons
        scrollSnaps={scrollSnaps}
        scrollTo={onDotButtonClick}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};
