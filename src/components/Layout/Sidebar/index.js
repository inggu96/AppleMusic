import { Routes, Route } from 'react-router-dom';
import SidebarToggle from './SidebarToggle';
import { SIDEBAR_DATA } from './Data';
import styles from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarToggle>
        <Routes>
          {SIDEBAR_DATA &&
            SIDEBAR_DATA.map((item, index) => (
              <Route key={index} path={item.path} />
            ))}
        </Routes>
      </SidebarToggle>
    </div>
  );
};

export default Sidebar;
