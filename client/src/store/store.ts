import { configureStore } from '@reduxjs/toolkit';

import * as reducers from '@/store/slices';

export const store = configureStore({
  reducer: {
    ...reducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
