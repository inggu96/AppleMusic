import React from 'react';
import styles from './home.module.scss';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/VideoActions';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (res) => {
      console.log(res.access_token);
      await axios({
        method: 'get',
        url: 'http://localhost:54254/',
        data: { access_token: res.access_token },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      dispatch(login());
      navigate('/play');
    },
    onError: () => console.log('Login Failed'),
    flow: 'auth-code',
  });

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
      <div className={styles.homeButton2} onClick={googleSocialLogin}>
        시작하기
      </div>
      <img src="https://music.apple.com/assets/cwc/upsells/listen-now/web/en-us/medium.png" />
    </main>
  );
};
export default Home;
