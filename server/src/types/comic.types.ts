import { Author, Comic, Comment, Folder, Genre, Status, Theme, User } from '@prisma/client';

import { IPaginationArg, ISortArg } from '@/types/common.types';

import { IChapterWithUser, IShortChapter } from './chapter.types';

export type IComicCount = {
  comments: number;
};

export type IShortComic = Pick<Comic, 'id' | 'img' | 'title'>;

export type IComicWithData = Comic & {
  avg_rating: number;
  unique_bookmarks_count: number;
  comments_count: number;
  authors: Author[];
  genres: Genre[];
  themes: Theme[];
  status: Status;
};

export type IComicWithDataSingle = IComicWithData & {
  first_chapter: IShortChapter;
  comments: Comment[];
};

export type IComicWithChapter = Comic & {
  chapters: IChapterWithUser[];
};

export type IGetAllComicsQuery = IPaginationArg &
  ISortArg & {
    genres: string;
    themes: string;
    authors: string;
    statuses: string;
    title: Comic['title'];
    folderId: Folder['id'];
    ratedUser: User['login'];
    date: string;
    startDate: string;
    endDate: string;
  };
