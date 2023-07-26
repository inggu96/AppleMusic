import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, searchList } from '../../state/VideoActions';
import { CircularProgress } from '@mui/material';
import MovieHome from '../MovieHome';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);

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
    <article className={styles.HomeMain}>
      <main className={styles.homeWrap}>
        <div className={styles.homeLogo}>
          <span>Music</span>
        </div>
        <div className={styles.homeSubHead}>
          감상중인 아티스트와 장르를 기준으로 엄선된 플레이리스트 및 <br />
          앨범이 제공됩니다
        </div>
        <div className={styles.homeLoginWrap}>
          <button>게스트</button>
          <button>구글</button>
        </div>
        <img src="https://music.apple.com/assets/cwc/upsells/listen-now/web/en-us/medium.png" />
      </main>
    </article>
  );
};
export default Home;
