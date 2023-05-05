import * as yup from 'yup';

export const initialValues = {
  name: '',
  email: '',
  password: '',
  universityId: '',
  chatId: null,
};

export type FormValues = typeof initialValues;

export const schemaRegistration = yup.object({
  name: yup
    .string()
    .min(5, 'Name is too short - should be 5 chars minimum.')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  universityId: yup.string().required('University is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const initialValuesLogin = {
  email: 'test111@gmail.com',
  password: 'test111',
};
export type FormValuesLogin = typeof initialValuesLogin;

export const schemaLogin = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
