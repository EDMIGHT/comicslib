import { useEffect, useState } from 'react';

import { API_AUTH_URL } from '@/configs/url.configs';
import { apiAuth } from '@/services/apiAuth';
import { IUser } from '@/types/user.types';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await apiAuth.get(API_AUTH_URL.authMe);
        setUser(response.data);
        setLoading(false);
      } catch (error: unknown) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return { user, loading, error };
};
