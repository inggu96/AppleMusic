import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrap}>
      <div className={styles.left}>
        <p>무비셀렉터</p>
        <p>1팀 : 이인국, 주양아, 신현중, 구성미</p>
      </div>
      <div className={styles.right}>
        <p>codestates @2023 cooperation</p>
        <a href="https://github.com/Yang-ah/select_movie.git">
          https://github.com/Yang-ah/select_movie.git
        </a>
      </div>
    </footer>
  );
};

export default Footer;
