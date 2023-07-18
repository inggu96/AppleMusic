import { GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const GoogleButton = () => {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
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
