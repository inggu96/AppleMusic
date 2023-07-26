import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Music from './Music';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
      <Music />
    </div>
  );
};

export default Layout;
