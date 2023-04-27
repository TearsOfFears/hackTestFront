import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Loader from './components/Loader';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes } from './routes.config';

const router = createBrowserRouter([
  {
    path: Routes.HOME.route,
    element: <Home />
    // loader: <Loader />,
  },
  {
    path: Routes.LOGIN.route,
    element: <Login />
    // loader: <Loader />,
  },
  {
    path: Routes.REGISTER.route,
    element: <Register />
    // loader: <Loader />,
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
