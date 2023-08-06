import { User } from '@prisma/client';

export type IShortUser = Pick<User, 'id' | 'img' | 'login'>;
