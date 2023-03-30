import React from "react";
import styles from "./header.module.scss";

import { Link } from "react-router-dom";
import { Button, SearchInput } from "../Common";

//recoil
import { useRecoilState } from 'recoil';
import { isLogin } from "../../atom";

// 인라인 스타일링 지양! 유지보수 어렵.
const Header = () => {

const [isLogin, setIsLogin] = useRecoilState(isLogin);

  return (
    <header className={styles.wrap}>
      <Link to="/">
        <div className={styles.logo}>무비셀렉터</div>
      </Link>

      <div className={styles.right}>
        <SearchInput option="iconLocation" className={styles.searchInput} />
        <Link to="/auth/login">
          <Button children={"로그인"} className={styles.headerSign} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
