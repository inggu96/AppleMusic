import React from 'react';
import ReactDOM from 'react-dom/client';

import './globals.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Router from './router';
import store from './state/Store/configureStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.log('렌더에러');
}
