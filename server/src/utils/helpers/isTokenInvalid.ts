import { Session } from '@prisma/client';

import { VerifiedTokenPayload } from '@/types/token.types';

export const isTokenInvalid = (
  dbToken: Session,
  tokenPayload: VerifiedTokenPayload
): boolean => {
  return dbToken.userId !== tokenPayload.id;
};
