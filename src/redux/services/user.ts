import { FormValuesLogin } from '../../forms/validations';
import { apiSlice } from '../api';
import { AuthState, IUser } from '../slices/userSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthState, FormValuesLogin>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<IUser, FormValuesLogin>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<Pick<IUser, 'userId'>, any>({
      query: (credentials) => ({
        url: 'auth/logout',
        method: 'POST',
        body: credentials,
      }),
    }),
    get: builder.query<string, any>({
      query: (credentials) => ({
        url: `auth/${credentials}`,
        method: 'GET',
      }),
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetQuery,
} = userApi;
