import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ISettingsSlice = {
  isActiveMenu: boolean;
};

const initialState: ISettingsSlice = {
  isActiveMenu: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsActiveMenu: (state, action: PayloadAction<boolean>) => {
      state.isActiveMenu = action.payload;
    },
  },
});

export const settingsSliceActions = settingsSlice.actions;

export default settingsSlice.reducer;
