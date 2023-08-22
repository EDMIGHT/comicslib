import { Bookmark } from '@prisma/client';

import { IShortChapter } from './chapter.types';
import { IShortComic } from './comic.types';

export type IResponseBookmark = Bookmark & {
  comic: IShortComic;
  chapter: IShortChapter;
  page: {
    number: number;
  };
};
