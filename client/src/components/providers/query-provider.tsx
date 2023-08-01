'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

type IQueryProviderProps = {
  children: ReactNode;
};

export const QueryProvider: FC<IQueryProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
