import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { Comic } from './layouts/comic';

type IComicsProps = {
  comics: IResponseComic[];
};

export const ComicsList: FC<IComicsProps> = ({ comics }) => {
  return (
    <ul className='grid auto-cols-max grid-cols-2 gap-2'>
      {comics.map((comic) => (
        <li key={comic.id}>
          <Comic {...comic} />
        </li>
      ))}
    </ul>
  );
};
