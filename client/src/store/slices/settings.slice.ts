import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LIMITS } from '@/configs/site.configs';

type ISettingsSlice = {
  isActiveMenu: boolean;
  countComicsPerPage: number;
  countUsersPerPage: number;
};

const initialState: ISettingsSlice = {
  isActiveMenu: true,
  countComicsPerPage: LIMITS.comics,
  countUsersPerPage: LIMITS.users,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsActiveMenu: (state, action: PayloadAction<boolean>) => {
      state.isActiveMenu = action.payload;
    },
    setCountsPerPage: (
      state,
      action: PayloadAction<Pick<ISettingsSlice, 'countComicsPerPage' | 'countUsersPerPage'>>
    ) => {
      state.countComicsPerPage = action.payload.countComicsPerPage;
      state.countUsersPerPage = action.payload.countUsersPerPage;
    },
  },
});

export const settingsSliceActions = settingsSlice.actions;

export default settingsSlice.reducer;
