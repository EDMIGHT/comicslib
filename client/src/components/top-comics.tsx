'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { GenresList } from './genres-list';

type TopComicsProps = {
  comics: IResponseComic[];
};

export const TopComics: FC<TopComicsProps> = ({ comics }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    Autoplay({ delay: 8000 }),
  ]);

  return (
    <div className='overflow-hidden' ref={emblaRef}>
      <ul className='flex'>
        {comics.map(({ id, img, title, genres }) => (
          <li
            key={id}
            className='relative mr-4 h-[16rem] min-w-0 flex-none basis-[calc(33.333333%-1rem+1px)] overflow-hidden rounded-xl sm:h-[20rem]'
          >
            <Link href={`/comics/${id}`}>
              <Image src={img} alt={title} fill className='object-cover hover:scale-105' />
            </Link>
            <div className='absolute bottom-4 left-[50%] z-[2]  w-[96%] translate-x-[-50%] space-y-1 overflow-hidden rounded-xl bg-background/80 px-5 py-2  backdrop-blur-md transition-transform'>
              <Link href={`/comics/${id}`} className='w-fit'>
                <h3 className=' truncate text-sm font-bold sm:text-lg'>{title}</h3>
              </Link>

              {genres.length > 0 && (
                <GenresList
                  genres={genres.slice(0, 4)}
                  className='flex-nowrap overflow-hidden'
                  type='link'
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
