import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import rootRouter from './router';

import './styles/global.scss';

import { Provider } from 'react-redux';
import store from './state/Store/configureStore';
import { createTheme, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFA266',
      main: '#FF7700',
      dark: '#C45A00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#F7F4F2',
      dark: '#B2B0AE',
      contrastText: '#3C3B3A',
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={rootRouter} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
