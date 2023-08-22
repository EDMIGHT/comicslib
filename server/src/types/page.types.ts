import { Page } from '@prisma/client';

import { IChapterWithShortUserAndShortComic } from './chapter.types';

export type IResponsePage = Page & {
  chapter: IChapterWithShortUserAndShortComic;
};
