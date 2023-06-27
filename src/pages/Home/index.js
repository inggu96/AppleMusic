import React, { useState } from 'react';
import styles from './home.module.scss';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/VideoActions';
import { auth } from '../../firebase-config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userData = useSelector((state) => state.userData);
  const auth = getAuth();

  const handleGoogleLogin = async (Data) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (data) => {
        dispatch(setUserData(data.user));
        dispatch(userData);
        console.log(data);
        dispatch(login());
        navigate('/music');
        const accessToken = await data.user.getIdToken();
        const refreshToken = await data.user.refreshToken;
        const email = data.user.email;

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', email);

        const refreshExpiration = new Date().getTime() + 3 * 60 * 60 * 1000; // 3시간
        localStorage.setItem('refreshExpiration', refreshExpiration);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGuest = () => {
    navigate('/music');
  };

  return (
    <main className={styles.homeWrap}>
      <div className={styles.homeLogo}>
        <AppleIcon />
        <span>Music</span>
      </div>
      <div className={styles.homeHead}>
        매일 새로운 음악을 <br /> 발견해보세요
      </div>
      <div className={styles.homeSubHead}>
        감상중인 아티스트와 장르를 기준으로 엄선된 플레이리스트 및 <br />
        앨범이 제공됩니다
      </div>
      <div>
        <div className={styles.homeButton2} onClick={handleGuest}>
          게스트 로그인
        </div>
        <div className={styles.homeButton2} onClick={handleGoogleLogin}>
          회원가입
        </div>
      </div>
      <div className={styles.homeButton2} onClick={handleGoogleLogin}>
        구글로 시작하기
      </div>
      <div>{userData && userData.email}</div>
      <img src="https://music.apple.com/assets/cwc/upsells/listen-now/web/en-us/medium.png" />
    </main>
  );
};
export default Home;
