import React from 'react';
import styles from './home.module.scss';
import { useSelector } from 'react-redux';
import { Wallpaper } from '../../components/Common';
import { Divider } from '../../components/Common';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import List from './List';
import Article from './Article';

const Home = () => {
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const { id } = useParams();

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <article className={styles.HomeMain}>
        <div className={styles.text}>
          <p>둘러보기</p>
          <p>유튜브에서 듣고싶은 노래를 위플리에서 감상하세요.</p>
          <div className={styles.divider}></div>
        </div>
        <Wallpaper />
        <div className={styles.text}>
          <p>추천 노래리스트</p>
          <p>주인장이 추천하는 노래리스트입니다 !</p>
          <div className={styles.divider}></div>
        </div>
        <AnimatePresence>{id && <Article id={id} />}</AnimatePresence>
        <List selectedId={id !== undefined ? id : ''} />
      </article>
    </>
  );
};
export default Home;
