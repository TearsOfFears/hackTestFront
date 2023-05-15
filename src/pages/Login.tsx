import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
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
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    dispatch(setUser({ ...user } as IUser));
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <>
      <section className="flex mx-auto flex-col justify-center">
        <form
          className="flex mx-auto  flex-col justify-center w-64"
          onSubmit={formik.handleSubmit}
        >
          <Input
            variant="standard"
            disabled={isLoading}
            type="email"
            label="Email"
            error={getError(formik, 'email')}
            {...formik.getFieldProps('email')}
          />
          <Input
            variant="standard"
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
          <Button type="submit" style="mt-5" variant="contained">
            Login
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
      <Dialog
        open={modal}
        handler={setModal}
        className={'rounded-full'}
        dismiss={{ outsidePress: false }}
      >
        <DialogBody className="text-3xl flex gap-4 justify-center items-center h-48">
          <p className="text-4xl text-green">
            You was successfully logged in !!!
          </p>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Login;
