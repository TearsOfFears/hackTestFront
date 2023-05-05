import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface IUser {
  userId: string;
  name: string;
  email: string;
  chatId: string;
  universityId: string;
  passwordHash: string;
  updatedAt: string;
  createdAt: string;
  refreshToken: string;
  accessToken: string;
}
export interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      console.log('action.payload', action.payload);
      window.localStorage.setItem('accessToken', action.payload.accessToken);
      state.user = action.payload;
    },
    logout: (state) => {
      window.localStorage.setItem('accessToken', '');
      state.user = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth.user;

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
