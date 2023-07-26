import React, { useState } from 'react';
import SidebarItems from '../Items';

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
  LogoImage,
} from './SidebarStyles';
import { ArrowBackIcon, ArrowIcon } from '../../../../components/Common/Icons';

const MOBILE_VIEW = window.innerWidth < 468;

const SidebarToggle = ({ children }) => {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            <SidebarLogo href="/">
              <span className="logo">
                <LogoImage
                  displaySidebar={displaySidebar}
                  src="https://user-images.githubusercontent.com/122377401/255331619-9c2fd0ec-b2ef-4e89-b408-9e52c402f580.png"
                />
                <SidebarBrand displaySidebar={displaySidebar}>
                  위플리
                </SidebarBrand>
              </span>
            </SidebarLogo>
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              {displaySidebar ? (
                <ArrowBackIcon displaySidebar={displaySidebar} />
              ) : (
                <ArrowIcon displaySidebar={displaySidebar} />
              )}
            </SidebarToggler>
          </SidebarLogoWrapper>
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
};

export default SidebarToggle;
