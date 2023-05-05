import { apiSlice } from '../api';

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

export const universityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    find: builder.query<UniversityResponse, UniversityResponse>({
      query: () => ({
        url: 'university/find/?sortBy=createdAt&order=asc&pageSize=3&pageIndex=0',
        method: 'GET',
      }),
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const { useFindQuery } = universityApi;
