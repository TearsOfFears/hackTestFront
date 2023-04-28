import type { FormikInstance } from '../typings/formik';

export const getError = <T>(formik: FormikInstance<T>, name: keyof T) =>
  formik.touched[name] ? formik.errors[name] : '';
