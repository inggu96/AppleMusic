import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Music from './Music';

const Layout = () => {
  return (
    <Root>
      <div>
        <Outlet />
      </div>
      <Music />
    </Root>
  );
};

export default Layout;

const Root = styled(Box)({
  width: '100vw',
  backgroundColor: '#fff',
  '&> ssection': {
    padding: 20,
  },
});
