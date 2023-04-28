import React from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
import { Routes } from '../routes.config';

function Login(): JSX.Element {
  return (
    <>
      <section>
        login
        <Link to={Routes.REGISTER.route}>REgister</Link>
      </section>
    </>
  );
}

export default Login;
