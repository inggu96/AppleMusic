import React from 'react';
import styles from './wallpaper.module.scss';
import WallpaperImg from '../../../asset/Images/Wallpaper.jpg';

const Wallpaper = () => {
  return (
    <article className={styles.homeWallpaperWrapper}>
      <div className={styles.content}>
        <div className={styles.overlay} />
        <p className={styles.text}>
          유튜브에서 듣고싶은 노래를 <br /> 위플리에서 감상하세요.
        </p>
        <img src={WallpaperImg} />
      </div>
    </article>
  );
};

export default Wallpaper;
