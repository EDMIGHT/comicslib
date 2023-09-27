'use client';

import { FC, ReactNode, useEffect } from 'react';

import { LIMITS } from '@/configs/site.configs';
import { useActions } from '@/hooks/use-actions';
import { useLocalStorage } from '@/hooks/use-local-storage';

type LayoutProps = {
  children: ReactNode;
};

export const LocalStorageKeys = {
  countComicsPerPage: 'countComicsPerPage',
  countUsersPerPage: 'countUsersPerPage',
};

export const LocalProvider: FC<LayoutProps> = ({ children }) => {
  const { setCountsPerPage } = useActions();
  const [localCountComicsPerPage] = useLocalStorage(
    LocalStorageKeys.countComicsPerPage,
    LIMITS.comics
  );
  const [localCountUsersPerPage] = useLocalStorage(
    LocalStorageKeys.countUsersPerPage,
    LIMITS.users
  );

  useEffect(() => {
    setCountsPerPage({
      countComicsPerPage: localCountComicsPerPage,
      countUsersPerPage: localCountUsersPerPage,
    });
  }, [localCountComicsPerPage, localCountUsersPerPage, setCountsPerPage]);

  return <>{children}</>;
};
