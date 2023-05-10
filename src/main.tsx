import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import MainLayout from './Layouts/MainLayout';
import Loader from './components/Loader';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { persistor, store } from './redux/store';
import { Routes } from './routes.config';

import { ThemeProvider } from '@material-tailwind/react';

const routes = [
  { path: Routes.HOME.route, element: <Home />, nodeRef: createRef() },
  {
    path: Routes.REGISTER.route,
    element: <Register />,
    nodeRef: createRef(),
  },
  {
    path: Routes.LOGIN.route,
    element: <Login />,
    nodeRef: createRef(),
  },
  {
    path: Routes.ACCOUNT.route,
    element: <Account />,
    nodeRef: createRef(),
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} fallbackElement={<Loader />} />
      </PersistGate>
    </ThemeProvider>
  </Provider>,
);
