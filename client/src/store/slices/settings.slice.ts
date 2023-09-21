import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ISettingsSlice = {
  isActiveMenu: boolean;
  countComicsPerPage: number;
  countUsersPerPage: number;
};

const initialState: ISettingsSlice = {
  isActiveMenu: true,
  countComicsPerPage: 6,
  countUsersPerPage: 6,
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
