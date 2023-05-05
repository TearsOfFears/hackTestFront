import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import Loader from '../components/Loader';
import {
  FormValuesLogin,
  initialValuesLogin,
  schemaLogin,
} from '../forms/validations';
import { useLoginMutation } from '../redux/services/user';
import { IUser, setUser } from '../redux/slices/userSlice';
import { Routes } from '../routes.config';
import { getError } from '../utils/formik';

function Login(): JSX.Element {
  const [login, { data: user, isLoading, isSuccess, error }] =
    useLoginMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<FormValuesLogin>({
    initialValues: initialValuesLogin,
    validationSchema: schemaLogin,
    validateOnBlur: false,
    onSubmit: async (data) => {
      const user = await login(data);
      if ('data' in user) {
        setModal(!modal);
      }
    },
  });

  if (isSuccess) {
    dispatch(setUser({ ...user } as IUser));
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <>
      <section className="flex mx-auto flex-col justify-center">
        <form
          className="flex mx-auto  flex-col justify-center w-64"
          onSubmit={formik.handleSubmit}
        >
          <Input
            disabled={isLoading}
            type="email"
            label="Email"
            error={getError(formik, 'email')}
            {...formik.getFieldProps('email')}
          />
          <Input
            disabled={isLoading}
            type="password"
            label="Password"
            error={getError(formik, 'password')}
            showPassword={() => setShow(!show)}
            isPassword={true}
            isShow={!show}
            {...formik.getFieldProps('password')}
          />
          {error && (
            <div className="text-lg text-center text-orange">
              {error.data.message}
            </div>
          )}
          <Button type="submit" style="mt-5">
            {!isLoading ? 'Login' : <Loader />}
          </Button>
          <Link
            to={Routes.REGISTER.route}
            className="mt-5 transition-all duration-500 ease-out
             text-center text-blue  hover:underline
             hover:underline-offset-8 "
          >
            You don`t have account ?
          </Link>
        </form>
      </section>
      <Modal open={modal} setOpen={setModal}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 bg-green">
          <div className="sm:flex sm:items-start">
            <div className="mt-2 mb-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="mt-2 text-center">
                <p className="text-4xl text-green">
                  You was successfully logged in !!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
