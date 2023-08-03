import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as asyncActions from '@/store/actions';
import { authSliceActions } from '@/store/slices/auth.slice';

export const useActions = () => {
  const dispatch = useDispatch();

  const actions = {
    ...asyncActions,
    ...authSliceActions,
  };

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
