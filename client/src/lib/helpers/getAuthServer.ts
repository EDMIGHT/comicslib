import { cookies } from 'next/headers';

import { api } from '@/services/api';

export const getAuthServer = async () => {
  try {
    const { data } = await api.get('auth/me');
    return data;
  } catch (error) {
    return null;
  }
};
