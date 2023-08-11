import { IChapter, IChapterWithUser } from './chapter.types';
import { IShortComic } from './comic.types';
import { IPagination } from './response.types';

export type IPage = {
  chapter: IChapterWithUser & {
    comic: IShortComic;
  };
  img: string;
};

export type IResponsePage = IPage &
  IPagination & {
    nextChapter: IChapter | null;
    prevChapter: IChapter | null;
  };
