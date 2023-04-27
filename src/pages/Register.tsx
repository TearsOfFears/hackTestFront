import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import { Routes } from '../routes.config';
import Button from '../common/Button';
import Input from '../common/Input';
import { useState } from 'react';
import Select from '../common/Select';

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<any>({});
  const handleRegistration = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev: { key: string; value: string }) => ({ ...prev, [name]: value }));
  };
  return (
    <MainLayout>
      <section className="flex mx-auto flex-col justify-center">
        <form className="flex mx-auto  flex-col justify-center w-64" onSubmit={handleRegistration}>
          <Input
            type="text"
            label="Name"
            name="name"
            value={inputs?.name || ''}
            handleChange={handleInput}
            extraClasses="mb-8"
          />
          <Input
            type="email"
            label="Email"
            name="email"
            handleChange={handleInput}
            value={inputs?.email || ''}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            handleChange={handleInput}
            value={inputs?.password || ''}
          />
          <Select
            type="text"
            name="university"
            label="University"
            value={inputs?.university || ''}
            handleChange={handleInput}
          />
          <Button>Registration</Button>
        </form>
      </section>
    </MainLayout>
  );
}

export default Register;
