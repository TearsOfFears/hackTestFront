import { FormValuesLogin } from '../../forms/validations';
import { IFind } from '../../types/question';
import { apiSlice } from '../api';
import { AuthState, IUser } from '../slices/userSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation<AuthState, FormValuesLogin>({
      query: (credentials) => ({
        url: 'question/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    findQuestion: builder.query<IFind, string>({
      query: (credentials) => {
        const query = new URLSearchParams(credentials).toString();
        return {
          url: `question/find/?${query}`,
          method: 'GET',
        };
      },
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const { useCreateSubjectMutation, useFindQuestionQuery } = subjectApi;
