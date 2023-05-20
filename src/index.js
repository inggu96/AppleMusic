import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import rootRouter from './router';

import './styles/global.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import store from './state/Store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="65465927783-p7hsnklfbehgfnm6odn1i41e6nla12ee.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={rootRouter} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
