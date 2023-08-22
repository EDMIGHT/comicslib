import { Session } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type CreationSession = Pick<Session, 'userId' | 'refreshToken'>;

export interface TokenPayload {
  id: string;
  login: string;
}

export type VerifiedTokenPayload = TokenPayload & JwtPayload;
