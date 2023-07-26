import { Routes, Route } from 'react-router-dom';
import SidebarToggle from './SidebarToggle';
import { SidebarData } from './Data';
import styles from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarToggle>
        <Routes>
          {SidebarData &&
            SidebarData.map((item, index) => (
              <Route key={index} path={item.path} />
            ))}
        </Routes>
      </SidebarToggle>
    </div>
  );
};

export default Sidebar;
