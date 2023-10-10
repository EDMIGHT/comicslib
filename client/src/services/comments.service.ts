import { ICreateCommentFields } from '@/components/forms/create-comment-form';
import { ENDPOINTS } from '@/configs/endpoint.configs';
import { LIMITS } from '@/configs/site.configs';
import { api } from '@/services/api';
import { apiAuth } from '@/services/apiAuth';
import { IComic } from '@/types/comic.types';
import {
  IComment,
  ICommentVoteType,
  ICommentWithReplies,
  IResponseAllComments,
  IResponseCheckUserCommentVote,
} from '@/types/comment.types';

type IGetAllChaptersArg = {
  comicId: IComic['id'];
  page?: string | number;
  limit?: string | number;
  order?: 'asc' | 'desc';
};

type ICreateCommentArg = {
  formData: ICreateCommentFields;
  comicId: IComic['id'];
  replyToId?: string | null;
};

export class CommentsService {
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
  public static async create({ formData, comicId, replyToId = null }: ICreateCommentArg) {
    const { data } = await apiAuth.post<ICommentWithReplies>(
      `${ENDPOINTS.comments.origin}/${comicId}`,
      {
        ...formData,
        replyToId,
      }
    );
    return data;
  }
  public static async getUserCommentsVotes(commentsIds: IComic['id'][]) {
    const { data } = await apiAuth.post<IResponseCheckUserCommentVote[]>(
      ENDPOINTS.comments.check,
      {
        commentsIds,
      }
    );
    return data;
  }
  public static async countingVote(comicId: IComic['id'], vote: ICommentVoteType) {
    const { data } = await apiAuth.post<ICommentWithReplies>(
      `${ENDPOINTS.comments.origin}/${comicId}/vote`,
      {
        type: vote,
      }
    );
    return data;
  }
  public static async delete(id: IComment['id']) {
    const { data } = await apiAuth.delete<null>(`${ENDPOINTS.comments.origin}/${id}`);
    return data;
  }
}
