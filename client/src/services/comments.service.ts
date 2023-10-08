import { ICreateCommentFields } from '@/components/forms/create-comment-form';
import { ENDPOINTS } from '@/configs/endpoint.configs';
import { LIMITS } from '@/configs/site.configs';
import { api } from '@/services/api';
import { apiAuth } from '@/services/apiAuth';
import { IResponseAllComments, IResponseComment } from '@/types/comment.types';

type IGetAllChaptersArg = {
  comicId: string;
  page?: string | number;
  limit?: string | number;
  order?: 'asc' | 'desc';
};

type ICreateCommentArg = {
  formData: ICreateCommentFields;
  comicId: string;
  replyToId?: string | null;
};

export class CommentsService {
  public static async create({ formData, comicId, replyToId = null }: ICreateCommentArg) {
    console.log({
      ...formData,
      replyToId,
    });
    const { data } = await apiAuth.post<IResponseComment>(
      `${ENDPOINTS.comments.origin}/${comicId}`,
      {
        ...formData,
        replyToId,
      }
    );
    return data;
  }
  public static async getAll({
    comicId,
    limit = LIMITS.chapters,
    page = 1,
    order = 'desc',
  }: IGetAllChaptersArg) {
    const { data } = await api.get<IResponseAllComments>(
      `${ENDPOINTS.comments.origin}/${comicId}?page=${page}&limit=${limit}&order=${order}`
    );
    return data;
  }
}
