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
            'replyToId', reply_to_id,
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
          ${alias}.reply_to_id,
          ${alias}.user_id as userId,
          ${alias}.comic_id as comicId,
          DATE_FORMAT(${alias}.created_at, '%Y-%m-%dT%H:%i:%s.%fZ') as createdAt,
          DATE_FORMAT(${alias}.updated_at, '%Y-%m-%dT%H:%i:%s.%fZ') as updatedAt,
          JSON_OBJECT(
            'id', ${userAlias}.id, 
            'login', ${userAlias}.login, 
            'img', ${userAlias}.img,
            '_count', JSON_OBJECT(
              'chapters', (SELECT COUNT(*) FROM Chapter WHERE Chapter.user_id = ${userAlias}.id),
              'comments', (SELECT COUNT(*) FROM Comment WHERE Comment.user_id = ${userAlias}.id),
              'ratings', (SELECT COUNT(*) FROM Rating WHERE Rating.user_id = ${userAlias}.id)
            )
          ) as user,
          SUM(
            CASE ${voteAlias}.type
              WHEN 'up' THEN 1
              WHEN 'down' THEN -1
              ELSE 0
            END
          ) as votes
        FROM Comment AS ${alias}
        LEFT JOIN CommentVote AS ${voteAlias} ON ${alias}.id = ${voteAlias}.comment_id
        INNER JOIN User AS ${userAlias} ON ${alias}.user_id = ${userAlias}.id
        WHERE ${alias}.reply_to_id = ${originComment}.id
        GROUP BY ${alias}.id, ${userAlias}.id
      ) AS SubQuery
    ),
    JSON_ARRAY()
  )`;
};
