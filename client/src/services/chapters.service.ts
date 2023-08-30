import { API_CHAPTERS_ENDPOINTS } from '@/configs/endpoint.configs';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { ICreateChapterFields } from '@/lib/validators/chapter.validators';
import { IChapter, IResponseAllChapters } from '@/types/chapter.types';
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
    limit = PAGINATION_LIMIT_CONFIG.chapters,
    page = 1,
    order = 'desc',
  }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponseAllChapters>(
      `${API_CHAPTERS_ENDPOINTS.origin}/${comicId}?page=${page}&limit=${limit}&order=${order}`
    );
    return data;
  }
  public static async getPage({ chapterId, page = 1 }: IGetChapterPageArg) {
    const { data } = await api.get<IResponsePage>(
      `${API_CHAPTERS_ENDPOINTS.origin}/${chapterId}/${page}`
    );
    return data;
  }
  public static async create(payload: ICreateChapterArg) {
    const { data } = await apiAuth.post<IChapter>(API_CHAPTERS_ENDPOINTS.origin, payload);
    return data;
  }
}
