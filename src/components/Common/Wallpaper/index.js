import React from 'react';
import styles from './wallpaper.module.scss';

const Wallpaper = () => {
  return (
    <article className={styles.homeWallpaperWrapper}>
      <div className={styles.overlay} />
      <img src="https://img.freepik.com/free-vector/headphones-violet-background-with-play-button-smartphone-screen-musical-notation-signs-realistic-vector-illustration_1284-81644.jpg?w=1800&t=st=1690443219~exp=1690443819~hmac=c611d091decfa9dbfa724205e84b7101ac1dc83e074a7dbc8883c883282c096e" />
      <div>
        <p className={styles.text}>유튜브에서 듣고싶은 노래를 </p>
        <p className={styles.text}>위플리에서 감상하세요. </p>
      </div>
    </article>
  );
};

export default Wallpaper;
