import React from 'react';
import styles from './home.module.scss';
import { useSelector } from 'react-redux';
import { CircularProgress, Paper } from '@mui/material';
import { Wallpaper } from '../../components/Common';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import List from './List';
import Article from './Article';

const Home = () => {
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const { id } = useParams();

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
    <>
      <article className={styles.HomeMain}>
        둘러보기
        <Wallpaper />
        <AnimatePresence>{id && <Article id={id} />}</AnimatePresence>
        <List selectedId={id !== undefined ? id : ''} />
      </article>
    </>
  );
};
export default Home;
