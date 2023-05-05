import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { logout, setUser } from './slices/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithReAuth = async (args: string, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setUser({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User,University,Subject'],
  endpoints: (builder) => ({}),
});
