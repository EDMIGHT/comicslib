import { Token } from '@prisma/client';

import { VerifiedTokenPayload } from '@/types/token.types';

export const isTokenInvalid = (
  dbToken: Token,
  tokenPayload: VerifiedTokenPayload
): boolean => {
  return dbToken.userId !== tokenPayload.id;
};
