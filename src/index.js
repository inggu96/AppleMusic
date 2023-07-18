import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import rootRouter from './router';

import './styles/global.scss';

import { Provider } from 'react-redux';
import store from './state/Store/configureStore';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="65465927783-p7hsnklfbehgfnm6odn1i41e6nla12ee.apps.googleusercontent.com">
        <RouterProvider router={rootRouter} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
