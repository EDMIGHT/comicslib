import { apiAuth } from '@/services/apiAuth';

export const getAuthServer = async () => {
  try {
    const { data } = await apiAuth.get('auth/me');
    return data;
  } catch (error) {
    return null;
  }
};
