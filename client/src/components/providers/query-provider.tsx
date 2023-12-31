'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

type IQueryProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const REACT_QUERY_KEYS = {
  rating: 'rating',
  users: 'users',
  authors: 'authors',
  folders: 'folders',
  comics: 'comics',
  chapters: 'chapters',
  comments: 'comments',
  bookmarks: 'bookmarks',
  me: 'me',
};

export const QueryProvider: FC<IQueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
