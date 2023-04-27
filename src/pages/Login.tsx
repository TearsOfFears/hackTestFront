import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import { Routes } from '../routes.config';

function Login():JSX.Element {
  return (
    <MainLayout>
      <section>
        login
        <Link to={Routes.REGISTER.route}>REgister</Link>
      </section>
    </MainLayout>
  );
}

export default Login;
