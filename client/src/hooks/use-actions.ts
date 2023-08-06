import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as asyncActions from '@/store/actions';
import { authSliceActions } from '@/store/slices/auth.slice';
import { settingsSliceActions } from '@/store/slices/settings.slice';

export const useActions = () => {
  const dispatch = useDispatch();

  const actions = {
    ...asyncActions,
    ...authSliceActions,
    ...settingsSliceActions,
  };

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
