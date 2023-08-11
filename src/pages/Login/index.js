import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';

const GoogleButton = () => {
  const [playList, setPlayList] = useState([]);
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
    },
    flow: 'auth-code',
  });

  return (
    <>
      <div
        className="social_login_box google"
        onClick={() => googleSocialLogin()}
      >
        <div className="social_login_text_box">구글로 시작하기</div>
        <div className="social_login_blank_box"> </div>
      </div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const decodeding = jwt_decode(credentialResponse.credential);
          console.log(decodeding);
          const accessToken = credentialResponse.access_token;
          const response = await apiClient.get('/playlists', {
            params: {
              part: 'snippet',
              channelId: 'UCLkAepWjdylmXSltofFvsYQ',
              maxResults: 10,
              order: 'relevance',
              key: '',
              access_token: accessToken,
            },
          });
          setPlayList(response.data.items);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <ul>
        {playList.map((item) => (
          <li key={item.id}>{item.snippet.title}</li>
        ))}
      </ul>
    </>
  );
};

export default GoogleButton;
