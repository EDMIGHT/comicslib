import { ICreateCommentFields } from '@/components/forms/create-comment-form';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { API_COMMENTS_URL } from '@/configs/url.configs';
import { IResponseAllComments, IResponseComment } from '@/types/comment.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

type IGetAllChaptersArg = {
  comicId: string;
  page?: string | number;
  limit?: string | number;
  order?: 'asc' | 'desc';
};

export class CommentsService {
  public static async create(formData: ICreateCommentFields, comicId: string) {
    const { data } = await apiAuth.post<IResponseComment>(
      `${API_COMMENTS_URL.origin}/${comicId}`,
      formData
    );
    return data;
  }
  public static async getAll({
    comicId,
    limit = PAGINATION_LIMIT_CONFIG.chapters,
    page = 1,
    order = 'desc',
  }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponseAllComments>(
      `${API_COMMENTS_URL.origin}/${comicId}?page=${page}&limit=${limit}&order=${order}`
    );
    return data.comments;
  }
}
