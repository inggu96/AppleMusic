import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUserData, setIsLoggedIn } from '../../state/VideoActions';
import { auth } from '../../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

import { CircularProgress } from '@mui/material';
import { saveTokens } from '../../utils/jwt';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userData = useSelector((state) => state.userData);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        const { accessToken, refreshToken } = data.user;
        //NOTE: 토큰 저장
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        if (accessToken) {
          saveTokens(data);
          getTokens(data);
          dispatch(login());
          navigate('/music');
        }

        console.log(data.user);
        console.log(isLoggedIn);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGuest = () => {
    dispatch(login()) ? navigate('/music') : alert('로그인을 해주세요');
  };

  if (loading) {
    return (
      <div className={styles.error}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }

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
      <div className={styles.homeLoginWrap}>
        <button className={styles.homeLogin} onClick={handleGuest}>
          게스트 로그인
        </button>
        <button className={styles.homeLogin} onClick={handleGoogleLogin}>
          구글로 로그인
        </button>
      </div>
      <img src="https://music.apple.com/assets/cwc/upsells/listen-now/web/en-us/medium.png" />
    </main>
  );
};
export default Home;
