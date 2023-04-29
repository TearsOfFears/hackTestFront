import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Root } from 'react-dom/client';

// import { userSlices } from '../services/user';
import { RootState } from '../store';

export interface AuthState {
  user: {
    userId: string | null;
    name: string | null;
    email: string | null;
    chatId: string | null;
    universityId: string | null;
    passwordHash: string | null;
    updatedAt: string | null;
    createdAt: string | null;
    refreshToken: string | null;
    accessToken: string | null;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      window.localStorage.setItem(
        'accessToken',
        action.payload.data.accessToken,
      );
      console.log(action.payload.data);
      state.user = { ...action.payload.data };
    },
  },
});

export const selectAuth = (state: RootState) => state.user.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
