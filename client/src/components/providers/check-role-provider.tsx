'use client';

import { useRouter } from 'next/router';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { IComponentAuthFields } from '@/types/auth-page.types';

const CheckRoleProvider: FC<PropsWithChildren<IComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const user = useAuth();
  const router = useRouter();

  if (user && isOnlyUser) {
    return <>{children}</>;
  }

  router.pathname !== '/auth' && router.replace('/signIn');
  return null;
};

export default CheckRoleProvider;
