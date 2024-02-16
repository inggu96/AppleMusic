import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/global.scss';

import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Router from './router';
import store from './state/Store/configureStore';

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
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.log('렌더에러');
}
