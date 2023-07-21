import { Token } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type CreationToken = Pick<Token, 'userId' | 'refreshToken'>;

export interface TokenPayload {
  id: string;
  login: string;
}

export type VerifiedTokenPayload = TokenPayload & JwtPayload;
