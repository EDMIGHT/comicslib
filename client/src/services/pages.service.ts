import { API_PAGES_URL } from '@/configs/url.configs';
import { IResponsePage } from '@/types/page.types';

import { api } from './api';

type IGetAllChaptersArg = {
  chapterId: string;
  page: string | number | undefined;
};

export class PagesService {
  public static async get({ chapterId, page = 1 }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponsePage>(
      `${API_PAGES_URL.origin}/${chapterId}/${page}`
    );
    return data;
  }
}
