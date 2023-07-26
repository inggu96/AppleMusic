import { auth } from '../../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import apiClient from '../../api/apiClient';

const BaseLogin = () => {
  const [userData, setUserData] = useState();
  const [playList, setPlayList] = useState([]);

  const handleGoogleLoginHome = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        const { accessToken, refreshToken } = data.user;
        //NOTE: 토큰 저장
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        if (accessToken) {
          saveTokens(data);
          dispatch(login());
          navigate('/music');
        }

        console.log(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const accessToken = data.user.accessToken;
        console.log(accessToken);
        const response = await apiClient.get('/playlists', {
          params: {
            part: 'snippet',
            channelId: 'UCLkAepWjdylmXSltofFvsYQ',
            maxResults: 10,
            order: 'relevance',
            key: 'AIzaSyDHlg5D1rVtRcj2fasxXw91Y4JM2S_SiI8',
            access_token: accessToken,
            mine: true,
          },
        });
        setUserData(data.user);
        setPlayList(response.data.items);
        console.log(response.data.items);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>로그인 테스트</h3>
      <button onClick={handleGoogleLogin}>로그인</button>
      <h4>이름표시</h4>
      <div>
        {userData
          ? '당신의 이름은 : ' + userData.displayName
          : '로그인 버튼을 눌러주세요 :)'}
        <div>
          {playList.map((video) => (
            <ul>
              <li>
                <p>{video.snippet.title}</p>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaseLogin;
