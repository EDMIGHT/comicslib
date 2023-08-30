import { useEffect, useState } from 'react';

import { API_AUTH_URL } from '@/configs/endpoint.configs';
import { getAccessToken } from '@/lib/helpers/token.helper';
import { apiAuth } from '@/services/apiAuth';
import { IUser } from '@/types/user.types';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { data } = await apiAuth.get(API_AUTH_URL.authMe);
        setUser(data);
        setLoading(false);
      } catch (error: unknown) {
        setError(error);
        setLoading(false);
      }
    };

    if (getAccessToken()) {
      fetchAuthData();
    }
  }, []);

  return { user, loading, error };
};
