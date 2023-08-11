import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import rootRouter from './router';

import './styles/global.scss';

import { Provider } from 'react-redux';
import store from './state/Store/configureStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={rootRouter} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

reportWebVitals();
