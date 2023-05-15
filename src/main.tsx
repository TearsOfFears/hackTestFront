import React, { createRef } from 'react';
import * as ReactDOM from 'react-dom/client';
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

// import { ThemeProvider } from '@material-tailwind/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
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
const themeDefault = createTheme({
  palette: {
    primary: {
      main: '#1fb6ff',
      light: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff7849',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});
const theme = createTheme(themeDefault, {
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          fontSize: '1rem',
          background: themeDefault.palette.primary.main,
          padding: themeDefault.spacing(2, 3),
          color: themeDefault.palette.secondary.contrastText,
          borderColor: themeDefault.palette.primary.main,
          borderRadius: '10px',
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            borderColor: themeDefault.palette.secondary.main,
          },
        },
        contained: {
          fontWeight: 600,
          '&:hover': {
            color: themeDefault.palette.primary.light,
            background: themeDefault.palette.primary.main,
            borderColor: themeDefault.palette.secondary.main,
            transition: themeDefault.transitions.duration.standard,
            fontWeight: 600,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          borderColor: themeDefault.palette.primary.main,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: themeDefault.palette.secondary.main,
            transition: '.3s',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: themeDefault.palette.secondary.main,
          },
        },
        notchedOutline: {
          borderWidth: '2px',
          color: themeDefault.palette.primary.main,
          borderColor: themeDefault.palette.primary.main,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: themeDefault.palette.secondary.main } },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: '10px' } } },
    MuiList: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        },
      },
      MuiMenuItem: {
        textAlign: 'center',
      },
    },
  },
});

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate loading={<Loader />} persistor={persistor}>
          <RouterProvider router={router} fallbackElement={<Loader />} />
        </PersistGate>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
);
