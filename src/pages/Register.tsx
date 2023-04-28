import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { getError } from './../utils/formik';

function Register(): JSX.Element {
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  const [modal, setModal] = useState<boolean>(false);
  const { data, isLoading: isLoadingUniversity } = useFindQuery();

  const navigate = useNavigate();
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
        await register(data);
      } catch (e) {
        console.log(e);
      } finally {
        setModal(!modal);
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
      </section>
      <Modal open={modal} setOpen={setModal}>
        You was successfully registered !!!
      </Modal>
    </>
  );
}

export default Register;
