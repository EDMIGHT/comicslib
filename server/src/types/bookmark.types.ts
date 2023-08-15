import { ReadingHistory } from '@prisma/client';

import { IShortChapter } from './chapter.types';
import { IShortComic } from './comic.types';

export type IResponseBookmark = ReadingHistory & {
  comic: IShortComic;
  chapter: IShortChapter;
  page: {
    number: number;
  };
};
