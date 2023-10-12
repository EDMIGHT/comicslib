'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/use-actions';
import { TokenHelper } from '@/lib/helpers/token.helper';

type LayoutProps = {
  children: ReactNode;
};

export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const { authMeThunk } = useActions();

  useEffect(() => {
    if (TokenHelper.getAccessToken()) {
      authMeThunk();
    }
  }, [authMeThunk]);

  return <>{children}</>;
};
