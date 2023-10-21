import { Session } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { SessionModel } from '@/models/session.model';
import { CreationSession, TokenPayload, VerifiedTokenPayload } from '@/types/token.types';

const accessKey = process.env.accessKey!;
const refreshKey = process.env.refreshKey!;
const expiresIn = Number(process.env.expiresIn)!;

export type CreateTokensResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

class TokenService {
  public createTokens(payload: TokenPayload): CreateTokensResult {
    const accessToken = jwt.sign(payload, accessKey, {
      expiresIn,
    });
    const refreshToken = jwt.sign(payload, refreshKey);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }
  public verifyAccessToken(token: string): VerifiedTokenPayload | null {
    try {
      return jwt.verify(token, accessKey) as VerifiedTokenPayload;
    } catch (error) {
      return null;
    }
  }
  public verifyRefreshToken(token: string): VerifiedTokenPayload | null {
    try {
      return jwt.verify(token, refreshKey) as VerifiedTokenPayload;
    } catch (error) {
      return null;
    }
  }
  public async save({ userId, refreshToken }: CreationSession): Promise<Session | null> {
    try {
      const foundToken = await SessionModel.getByUserId(userId);
      if (foundToken) {
        return await SessionModel.update({
          userId,
          refreshToken,
        });
      }
      return await SessionModel.create({ userId, refreshToken });
    } catch (error) {
      console.error('token save: ', error);
      return null;
    }
  }
  public async findRefreshToken(refreshToken: string): Promise<Session | null> {
    try {
      return SessionModel.getByRefreshToken(refreshToken);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
