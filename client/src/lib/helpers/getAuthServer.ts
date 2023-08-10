import { apiAuth } from '@/services/apiAuth';
import { IUser } from '@/types/user.types';

export const getAuthServer = async () => {
  try {
    const { data } = await apiAuth.get<IUser>('auth/me');
    return data;
  } catch (error) {
    return null;
  }
};
