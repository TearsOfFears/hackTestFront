import { Dialog, DialogBody } from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Loader from '../components/Loader';
import {
  FormValues,
  initialValues,
  schemaRegistration,
} from '../forms/validations';
import { useFindQuery } from '../redux/services/university';
import { useRegisterMutation } from '../redux/services/user';
import { IUser, setUser } from '../redux/slices/userSlice';
import { Routes } from '../routes.config';

import { getError } from './../utils/formik';

function Register(): JSX.Element {
  const [register, { data: user, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const {
    data,
    isLoading: isLoadingUniversity,
    error: errorUniversity,
  } = useFindQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: schemaRegistration,
    validateOnBlur: false,
    onSubmit: async (data) => {
      const user = await register(data);
      if ('data' in user) {
        setModal(!modal);
      }
    },
  });

  if (isLoadingUniversity) {
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
            type="text"
            label="Name"
            error={getError(formik, 'name')}
            {...formik.getFieldProps('name')}
          />
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
          {!isLoadingUniversity && (
            <Select
              disabled={isLoading || Boolean(error)}
              label="University"
              variant="standard"
              error={getError(formik, 'universityId')}
              arrayOption={data?.items.map(({ title, universityId }) => ({
                value: universityId,
                text: title,
              }))}
              containerProps={{
                className: 'mt-3',
              }}
              labelProps={{
                className: '!text-blue',
              }}
              {...formik.getFieldProps('universityId')}
            />
          )}
          {error && (
            <div className="text-lg text-center text-orange">
              {error.data.message}
            </div>
          )}
          <Button type="submit" style="mt-5">
            {'Registration'}
          </Button>
        </form>

        <Link
          to={Routes.LOGIN.route}
          className="mt-5 transition-all duration-500 ease-out text-center text-blue  hover:underline  hover:underline-offset-8 "
        >
          I`m have account
        </Link>
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

export default Register;
