import { Box, Container, styled } from '@mui/material';

import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import PlayerAccordion from './PlayerAccordion';

interface Props {
  id?: string;
  children: React.ReactNode;
}

const Layout = ({ id, children }: Props) => {
  return (
    <Root maxWidth="lg">
      <NavBar />
      {children}
      <PlayerAccordion />
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
