'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

type IReduxProverProps = {
  children: ReactNode;
};

export const ReduxProvider: FC<IReduxProverProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
