import { Token } from '@prisma/client';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

import { TokenModel } from '@/models/token.model';
import { CreationToken, TokenPayload, VerifiedTokenPayload } from '@/types/token.types';

env.config();

const accessKey = process.env.accessKey ?? '';
const refreshKey = process.env.refreshKey ?? '';
const expiresIn = Number(process.env.expiresIn) ?? 86400;

class TokenService {
  public createTokens(payload: TokenPayload): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } {
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
      return jwt.verify(token, accessKey) as VerifiedTokenPayload; // idk откуда стринга
    } catch (error) {
      return null;
    }
  }
  public verifyRefreshToken(token: string): VerifiedTokenPayload | null {
    try {
      return jwt.verify(token, refreshKey) as VerifiedTokenPayload; // idk откуда стринга
    } catch (error) {
      return null;
    }
  }
  public async save({ userId, refreshToken }: CreationToken): Promise<Token | null> {
    try {
      const foundToken = await TokenModel.getByUserId(userId);
      if (foundToken) {
        return await TokenModel.update({
          userId,
          refreshToken,
        });
      }
      return await TokenModel.create({ userId, refreshToken });
    } catch (error) {
      console.log('token save: ', error);
      return null;
    }
  }
  public async findRefreshToken(refreshToken: string): Promise<Token | null> {
    try {
      return TokenModel.getByRefreshToken(refreshToken);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
