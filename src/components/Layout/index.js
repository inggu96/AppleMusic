import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
