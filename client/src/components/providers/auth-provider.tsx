'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAuthMeMutation } from '@/services/auth.service';
import { setAuthData } from '@/store/slices/auth.slice';

type IAuthProverProps = {
  children: ReactNode;
};

export const AuthProvider: FC<IAuthProverProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';

  const dispatch = useAppDispatch();

  const [authMe, { data, isSuccess }] = useAuthMeMutation();

  useEffect(() => {
    if (accessToken) {
      authMe(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setAuthData({
          user: data,
          accessToken,
          refreshToken,
        })
      );
    }
  }, [data, isSuccess]);

  return <>{children}</>;
};
