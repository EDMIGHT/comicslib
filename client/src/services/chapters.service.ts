import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { API_CHAPTERS_URL } from '@/configs/url.configs';
import { IResponseAllChapters } from '@/types/chapter.types';

import { api } from './api';

type IGetAllChaptersArg = {
  comicId: string;
  page?: string | number;
  limit?: string | number;
};

export class ChaptersService {
  public static async getAll({
    comicId,
    limit = PAGINATION_LIMIT_CONFIG.chapters,
    page = 1,
  }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponseAllChapters>(
      `${API_CHAPTERS_URL.origin}/${comicId}?page=${page}&limit=${limit}`
    );
    return data;
  }
}
