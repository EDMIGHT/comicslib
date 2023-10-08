import { Prisma } from '@prisma/client';

// TODO find the reason why the query fails during recursion

export const createQueryNestedComments = (depth = 0, prefix?: number): Prisma.Sql => {
  if (depth === 0) {
    return Prisma.empty;
  }

  const alias = Prisma.raw(`ReplyComment` + (prefix ?? ''));
  const userAlias = Prisma.raw(`ReplyUser` + (prefix ?? ''));
  const voteAlias = Prisma.raw(`ReplyCommentVote` + (prefix ?? ''));

  const originComment = Prisma.raw(prefix ? `ReplyComment${prefix + 1}` : 'Comment');

  return Prisma.sql`COALESCE(
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', id,
            'text', text,
            'replyToId', replyToId,
            'userId', userId,
            'comicId', comicId,
            'createdAt', createdAt,
            'updatedAt', updatedAt,
            'user', user,
            'votes' , votes
          )
        )
      FROM (
        SELECT
          ${alias}.id,
          ${alias}.text,
          ${alias}.replyToId,
          ${alias}.user_id as userId,
          ${alias}.comic_id as comicId,
          ${alias}.created_at as createdAt,
          ${alias}.updated_at as updatedAt,
          JSON_OBJECT('id', ${userAlias}.id, 'login', ${userAlias}.login, 'img', ${userAlias}.img) as user,
          SUM(
            CASE ${voteAlias}.type
              WHEN 'up' THEN 1
              WHEN 'down' THEN -1
              ELSE 0
            END
          ) as votes
        FROM Comment AS ${alias}
        LEFT JOIN CommentVote AS ${voteAlias} ON ${alias}.id = ${voteAlias}.commentId
        INNER JOIN User AS ${userAlias} ON ${alias}.user_id = ${userAlias}.id
        WHERE ${alias}.replyToId = ${originComment}.id
        GROUP BY ${alias}.id, ${userAlias}.id
      ) AS SubQuery
    ),
    JSON_ARRAY()
  )`;
};
