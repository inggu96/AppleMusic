import React from 'react';
import styles from './wallpaper.module.scss';

const Wallpaper = () => {
  return (
    <article className={styles.homeWallpaperWrapper}>
      <div className={styles.content}>
        <div className={styles.overlay} />
        <p className={styles.text}>
          유튜브에서 듣고싶은 노래를 <br /> 위플리에서 감상하세요.
        </p>
        <img src="images/Wallpaper.jpg" />
      </div>
    </article>
  );
};

export default Wallpaper;
