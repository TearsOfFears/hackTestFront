import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

// import type { Pokemon } from './types';

export interface PageInfo {
  pageSize: number;
  pageIndex: number;
  pageTotal?: number;
}
export interface Item {
  universityId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
export interface UniversityResponse {
  items: Item[];
  pageInfo: PageInfo;
}
export const universityApi = createApi({
  reducerPath: 'universityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api/university/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    find: builder.query<UniversityResponse, UniversityResponse>({
      query: () => ({
        url: 'find/?sortBy=createdAt&order=asc',
        method: 'GET',
      }),
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const { useFindQuery } = universityApi;
