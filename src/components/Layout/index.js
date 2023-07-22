import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import SideMui from './SideMui';

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.sidebar}>
        <SideMui />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
