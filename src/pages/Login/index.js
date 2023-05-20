import { GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

const GoogleButton = () => {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);

          const decodeding = jwt_decode(credentialResponse.credential);
          console.log(decodeding);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
};

export default GoogleButton;
