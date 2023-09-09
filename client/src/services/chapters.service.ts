import { ENDPOINTS } from '@/configs/endpoint.configs';
import { LIMITS } from '@/configs/site.configs';
import { ICreateChapterFields } from '@/lib/validators/chapter.validators';
import { IChapter, IResponseAllChapters, IShortChapter } from '@/types/chapter.types';
import { IResponsePage } from '@/types/page.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

type IGetAllChaptersArg = {
  comicId: string;
  page?: string | number;
  limit?: string | number;
  order?: 'asc' | 'desc';
};

type IGetChapterPageArg = {
  chapterId: string;
  page: string | number | undefined;
};

export type ICreateChapterArg = Omit<ICreateChapterFields, 'pages' | 'number'> & {
  number: number;
  comicId: string;
  pages: {
    number: number;
    img: string;
  }[];
};

export class ChaptersService {
  public static async getAll({
    comicId,
    limit = LIMITS.chapters,
    page = 1,
    order = 'desc',
  }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponseAllChapters>(
      `${ENDPOINTS.chapters.origin}/${comicId}?page=${page}&limit=${limit}&order=${order}`
    );
    return data;
  }
  public static async getPage({ chapterId, page = 1 }: IGetChapterPageArg) {
    const { data } = await api.get<IResponsePage>(
      `${ENDPOINTS.chapters.origin}/${chapterId}/${page}`
    );
    return data;
  }
  public static async getContentForComic(comicId: string) {
    const { data } = await api.get<IShortChapter[]>(
      `${ENDPOINTS.chapters.content}/${comicId}`
    );
    return data;
  }
  public static async create(payload: ICreateChapterArg) {
    const { data } = await apiAuth.post<IChapter>(ENDPOINTS.chapters.origin, payload);
    return data;
  }
}
