import { configureStore } from '@reduxjs/toolkit';

import { userSlices, universitySlices } from './services/index';

export const store = configureStore({
  reducer: {
    [userSlices.reducerPath]: userSlices.reducer,
    [universitySlices.reducerPath]: universitySlices.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlices.middleware,
      universitySlices.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
