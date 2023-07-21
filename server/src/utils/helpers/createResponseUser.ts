import { User } from '@prisma/client';

export const createResponseUser = (user: User | null): Omit<User, 'password'> | null => {
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...responseUser } = user;

    return responseUser;
  } else return null;
};
