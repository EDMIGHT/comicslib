'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useCallback } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { NextButton, PrevButton, usePrevNextButtons } from '../carousel-arrow-buttons';
import { ComicAttributes } from '../comic-attributes';

type FullScreenComicCarouselProps = {
  comics: IResponseComic[];
};

export const FullScreenComicCarousel: FC<FullScreenComicCarouselProps> = ({ comics }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 8000 }),
  ]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    selectedIndex,
  } = usePrevNextButtons(emblaApi, onButtonClick);

  return (
    <div className='relative rounded-lg shadow'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex touch-pan-y'>
          {comics.map((comic, i) => (
            <Link
              href={`/comics/${comic.id}`}
              className='relative mr-2 min-w-0 flex-[0_0_100%] overflow-hidden  p-4'
              key={comic.id}
            >
              <div className='relative h-[300px] w-full'>
                <div className='grid h-full grid-cols-[auto_1fr] gap-2'>
                  <div className='relative h-full w-[240px] overflow-hidden rounded'>
                    <Image
                      src={comic.img}
                      alt={comic.title}
                      sizes='300px'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex h-full flex-col gap-2 py-2'>
                    <h3 className='line-clamp-2 text-xl font-bold lg:text-4xl'>
                      {comic.title}
                    </h3>
                    <ComicAttributes
                      isLink={false}
                      themes={comic.themes}
                      genres={comic.genres}
                    />
                    <p className='line-clamp-5 text-sm'>{comic.desc}</p>
                    <h4 className='mt-auto w-[90%] truncate font-medium italic'>
                      {comic.authors.length > 1
                        ? comic.authors.map((author) => `,${author.login}`)
                        : comic.authors[0].login}
                    </h4>
                  </div>
                </div>
                <Image
                  src={comic.img}
                  alt={comic.title}
                  fill
                  className='-z-10 object-cover opacity-40 blur-xl'
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='absolute bottom-4 right-2 flex items-center gap-2'>
        <span className='text-sm font-semibold uppercase'>NO. {selectedIndex + 1}</span>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};
