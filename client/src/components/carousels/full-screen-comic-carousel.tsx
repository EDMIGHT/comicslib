'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useCallback } from 'react';

import { ComicAttributes } from '@/components/comic-attributes';
import {
  CarouselNextButton,
  CarouselPrevButton,
} from '@/components/ui/carousel-arrow-buttons';
import { HREFS } from '@/configs/href.configs';
import { usePrevNextButtons } from '@/hooks/use-prev-next-carousel-buttons';
import { IResponseComic } from '@/types/comic.types';

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
          {comics.map((comic) => (
            <Link
              href={`${HREFS.comics}/${comic.id}`}
              className='relative min-w-0 flex-[0_0_100%] overflow-hidden  p-4'
              key={comic.id}
            >
              <div className='relative h-[260px] w-full'>
                <div className='grid h-full grid-cols-[auto_1fr] gap-2'>
                  <Image
                    src={comic.img}
                    alt={comic.title}
                    width={190}
                    height={260}
                    className='h-[220px] w-[150px] overflow-hidden rounded object-cover object-center md:h-[260px] md:w-[190px]'
                  />

                  <div className='grid grid-cols-1'>
                    <div className='flex h-full flex-col gap-2 py-2'>
                      <h3 className='line-clamp-2 text-xl font-bold lg:text-4xl'>
                        {comic.title}
                      </h3>
                      <ComicAttributes
                        isLink={false}
                        themes={comic.themes}
                        genres={comic.genres}
                        withControl={false}
                      />
                      <p className='line-clamp-5 text-sm'>{comic.desc}</p>
                      <h4 className='mt-auto hidden w-[90%] truncate font-medium italic md:block'>
                        {comic.authors.map((author) => author.login).join(', ')}
                      </h4>
                    </div>
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
        <CarouselPrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <CarouselNextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};
