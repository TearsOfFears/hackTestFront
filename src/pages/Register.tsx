import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
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
import { useFindMutation, useFindQuery } from '../redux/services/university';
import { useRegisterMutation } from '../redux/services/user';
import { AuthState, selectAuth, setUser } from '../redux/slices/userSlice';
import { Routes } from '../routes.config';

import { getError } from './../utils/formik';

function Register(): JSX.Element {
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  const [modal, setModal] = useState<boolean>(false);
  const { data, isLoading: isLoadingUniversity } = useFindQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<any>({});
  const handleRegistration = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: schemaRegistration,
    validateOnBlur: false,
    onSubmit: async (data) => {
      try {
        data.chatId = 32323232;
        const user = await register(data);
        if (user) {
          setModal(!modal);
          dispatch(
            setUser({
              ...user,
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name = e.target.name
    // const value = e.target.value
    // setInputs((prev: { key: string, value: string }) => ({
    // 	...prev,
    // 	[name]: value,
    // }))
  };

  if (isSuccess) {
    setTimeout(() => navigate('/'), 2000);
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
            type="text"
            label="Name"
            error={getError(formik, 'name')}
            {...formik.getFieldProps('name')}
          />
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
            {...formik.getFieldProps('password')}
          />
          {!isLoadingUniversity && (
            <Select
              disabled={isLoading}
              label="University"
              error={getError(formik, 'universityId')}
              {...formik.getFieldProps('universityId')}
            >
              <option defaultValue="" hidden />
              {data.items?.map(({ title, universityId }) => (
                <option key={universityId} value={universityId}>
                  {title}
                </option>
              ))}
            </Select>
          )}
          {error && (
            <div className="text-lg text-center text-orange">
              {error.data.message}
            </div>
          )}
          <Button type="submit" style="mt-5">
            {!isLoading ? 'Registration' : <Loader />}
          </Button>
        </form>

        <Link
          to={Routes.LOGIN.route}
          className="mt-5 transition-all duration-500 ease-out text-center text-blue  hover:underline  hover:underline-offset-8 "
        >
          I`m have account
        </Link>
      </section>
      <Modal open={modal} setOpen={setModal}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 bg-green">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="mt-2 text-center">
                <p className="text-4xl text-green">
                  You was successfully registered !!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Register;
