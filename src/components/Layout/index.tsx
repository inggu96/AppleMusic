import { Box, Container, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Music from './Music';
import NavBar from './NavBar';

interface Props {
  id?: string;
  children: React.ReactNode;
}

const Layout = ({ id, children }: Props) => {
  return (
    <Root maxWidth="lg">
      <NavBar />
      {children}
    </Root>
  );
};

export default Layout;

const Root = styled(Container)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  height: '200px',
});
