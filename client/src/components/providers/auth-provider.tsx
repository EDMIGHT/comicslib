'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/use-actions';
import { getAccessToken } from '@/lib/helpers/token.helper';

type LayoutProps = {
  children: ReactNode;
};

export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const { authMe } = useActions();

  useEffect(() => {
    if (getAccessToken()) {
      authMe();
    }
  }, []);

  return <>{children}</>;
};
