import { FormValuesLogin } from '../../forms/validations';
import { IFind } from '../../types/subject';
import { apiSlice } from '../api';
import { AuthState, IUser } from '../slices/userSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubject: builder.mutation<AuthState, FormValuesLogin>({
      query: (credentials) => ({
        url: 'subject/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    findSubject: builder.query<IFind, string>({
      query: (credentials) => {
        console.log('credentials', credentials);
        return {
          //url: `subject/find/${credentials}`,
          url: `subject/find/?sortBy=createdAt&order=asc&pageSize=20&pageIndex=0&universityId=${credentials}`,
          method: 'GET',
        };
      },
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const { useCreateSubjectMutation, useFindSubjectQuery } = subjectApi;
