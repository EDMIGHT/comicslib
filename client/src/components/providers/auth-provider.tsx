'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { getAccessToken, getRefreshToken } from '@/lib/helpers/token.helper';
import { IComponentAuthFields } from '@/types/auth-page.types';

const DynamicCheckRole = dynamic(() => import('./check-role-provider'), {
  ssr: false,
});

export const AuthProvider: FC<PropsWithChildren<IComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { user } = useAuth();

  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    // получили новые токены при первой загрузки приложения
    const accessToken = getAccessToken();

    if (accessToken) {
      checkAuth();
    }
  }, []);

  // useEffect(() => {
  //   // проверяем при изменении страницы не пропал ли у нас refresh токен
  //   const refreshToken = getRefreshToken();

  //   if (!refreshToken && user) {
  //     logout();
  //   }
  // }, [pathname]);

  return isOnlyUser ? (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  ) : (
    <>children</>
  );
};
