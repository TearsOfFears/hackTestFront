import type {
	FormikComputedProps,
	FormikHandlers,
	FormikHelpers,
	FormikState,
} from 'formik';

export type FormikInstance<T> = FormikComputedProps<T> &
	FormikState<T> &
	FormikHelpers<T> &
	FormikHandlers;

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;