import { Comment, Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

import prisma from '@/db/prisma';
import { ICommentWithUser } from '@/types/comment.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import { createQueryNestedComments } from '@/utils/helpers/create-query-nested-comments';

type ICreateCommentForComicArgs = Pick<Comment, 'text' | 'userId' | 'comicId' | 'replyToId'>;

type IGetAllForComicsArgs = ISortArg &
  IPaginationArg & {
    comicId: string;
  };
type IGetAllComment = ICommentWithUser & {
  replies: ICommentWithUser[];
  votes: number;
};

const commentSchema = prisma.comment.fields;

export class CommentModel {
  public static async getAllForComic({
    comicId,
    sort,
    order,
    limit,
    page,
  }: IGetAllForComicsArgs): Promise<IGetAllComment[]> {
    const offset = (page - 1) * limit;

    const inOrder: Sql = order === 'desc' ? Prisma.sql`DESC` : Prisma.sql`ASC`;

    const sortOptions = {
      votes: Prisma.sql`votes`,
      [commentSchema.createdAt.name]: Prisma.sql`Comment.created_at`,
    };

    const sortBy: Sql = sortOptions[sort] || Prisma.sql`Comment.created_at`;
    const orderQuery = Prisma.sql`ORDER BY ${sortBy} ${inOrder}`;

    const nestedCommentsQuery = createQueryNestedComments(1);

    const commentsWithVotes = await prisma.$queryRaw<IGetAllComment[]>`
    SELECT
      Comment.id,
      Comment.text,
      Comment.replyToId,
      Comment.user_id as userId,
      Comment.comic_id as comicId,
      DATE_FORMAT(Comment.created_at, '%Y-%m-%dT%H:%i:%s.%fZ') as createdAt,
      DATE_FORMAT(Comment.updated_at, '%Y-%m-%dT%H:%i:%s.%fZ') as updatedAt,
      JSON_OBJECT('id', User.id, 'login', User.login, 'img', User.img) as user,
      ${nestedCommentsQuery} as replies,
      SUM(
        CASE CommentVote.type
          WHEN 'up' THEN 1
          WHEN 'down' THEN -1
          ELSE 0
        END
      ) as votes
    FROM Comment
    LEFT JOIN CommentVote ON Comment.id = CommentVote.commentId
    INNER JOIN User ON Comment.user_id = User.id
    WHERE Comment.comic_id = ${comicId} AND Comment.replyToId IS NULL
    GROUP BY Comment.id, User.id
    ${orderQuery}
    LIMIT ${Number(limit)} OFFSET ${offset}
  `;

    commentsWithVotes.forEach((comment) => {
      comment.votes = Number(comment.votes);
    });

    return commentsWithVotes;
  }
  public static async getAllCount(comicId: string): Promise<number> {
    return prisma.comment.count({
      where: {
        comicId,
        replyToId: null,
      },
    });
  }
  public static async getById(id: Comment['id']): Promise<Comment | null> {
    return prisma.comment.findFirst({
      where: {
        id,
      },
    });
  }
  public static async createForComic(
    data: ICreateCommentForComicArgs
  ): Promise<ICommentWithUser> {
    return prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            login: true,
            img: true,
          },
        },
      },
    });
  }
}
