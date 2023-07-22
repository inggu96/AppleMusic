import { Routes, Route } from 'react-router-dom';
import SidebarMui from './SidebarMui';
import { SIDEBAR_DATA } from './Data';
import styles from './sidemui.module.scss';

const SideMui = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarMui>
        <Routes>
          {SIDEBAR_DATA &&
            SIDEBAR_DATA.map((item, index) => (
              <Route key={index} path={item.path} />
            ))}
        </Routes>
      </SidebarMui>
    </div>
  );
};

export default SideMui;
