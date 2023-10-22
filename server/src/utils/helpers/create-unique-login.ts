import { LIMITS } from '@/configs/general.configs';
import { UserModel } from '@/models/user.model';

const MAX_LOGIN_LENGTH = LIMITS.maxStringLength;
const NUM_SUFFIXES = 10;

export const createUniqueLogin = async (baseLogin: string): Promise<string> => {
  baseLogin = baseLogin.substring(0, MAX_LOGIN_LENGTH);

  const potentialLogins = Array.from({ length: NUM_SUFFIXES }, (_, i) => baseLogin + i);

  const existedUsers = await UserModel.getAllByLogins(potentialLogins);

  const existingLogins = new Set(existedUsers.map((user) => user.login));

  const uniqueLogin = potentialLogins.find((login) => !existingLogins.has(login));

  if (uniqueLogin) {
    return uniqueLogin;
  }

  baseLogin = baseLogin.substring(0, MAX_LOGIN_LENGTH - NUM_SUFFIXES.toString().length);

  const offsetSalt = 2;

  const randomSalt = Math.random()
    .toString(36)
    .substring(offsetSalt, NUM_SUFFIXES + offsetSalt);

  return createUniqueLogin(baseLogin + randomSalt);
};
