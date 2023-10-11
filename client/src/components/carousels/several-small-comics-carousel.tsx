'use client';

import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';

import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type SeveralSmallComicsCarouselProps = {
  comics: IResponseComic[];
};

export const SeveralSmallComicsCarousel: FC<SeveralSmallComicsCarouselProps> = ({
  comics,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

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
      <ul className='flex h-4 items-center justify-center gap-1'>
        {scrollSnaps.map((_, i) => {
          const distance = Math.abs(selectedIndex - i);

          return (
            <li key={i} className='flex items-center'>
              <button
                type='button'
                onClick={() => scrollTo(i)}
                className={cn(
                  'rounded-full transition-all',
                  i === selectedIndex ? 'bg-active h-4 w-4' : 'bg-card h-3 w-3',
                  distance === 1 && 'h-3 w-3',
                  distance === 2 && 'h-2 w-2',
                  distance === 3 && 'h-1 w-1',
                  distance > 3 && 'hidden'
                )}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
