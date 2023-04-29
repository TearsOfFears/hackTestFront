import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userApi, universityApi } from './services/index';
import userSlice from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [universityApi.reducerPath]: universityApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, universityApi.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
