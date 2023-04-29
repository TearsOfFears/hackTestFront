import React, { Fragment, createRef } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { PersistGate } from 'redux-persist/integration/react';

import MainLayout from './Layouts/MainLayout';
import Loader from './components/Loader';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { persistor, store } from './redux/store';
import { Routes } from './routes.config';

const routes = [
  { path: '/', element: <Home />, nodeRef: createRef() },
  {
    path: '/register',
    element: <Register />,
    nodeRef: createRef(),
  },
  {
    path: '/login',
    element: <Login />,
    nodeRef: createRef(),
  },
  {
    path: '/user/:userId',
    element: <Account />,
    nodeRef: createRef(),
  },
];

// const router = createBrowserRouter([
//   {
//     path: Routes.HOME.route,
//     element: <Home />,
//     children: routes.map((route) => ({
//       index: route.path === '/',
//       path: route.path === '/' ? undefined : route.path,
//       element: route.element,
//     })),
//     // loader: <Loader />,
//   },
//   {
//     path: Routes.LOGIN.route,
//     element: <Login />,
//     children: routes.map((route) => ({
//       index: route.path === '/',
//       path: route.path === '/' ? undefined : route.path,
//       element: route.element,
//     })),
//     // loader: <Loader />,
//   },
//   {
//     path: Routes.REGISTER.route,
//     element: <Register />,
//     children: routes.map((route) => ({
//       index: route.path === '/',
//       path: route.path === '/' ? undefined : route.path,
//       element: route.element,
//     })),
//     // loader: <Loader />,
//   },
// ]);
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
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </PersistGate>
  </Provider>,
);
