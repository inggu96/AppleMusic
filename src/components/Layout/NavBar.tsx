import { Box, styled, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <NavRoot>
      <Box className="nav-box">
        <Typography variant="h5">나의 웹사이트</Typography>
        <Box className="button-box">
          <Typography
            component={Link}
            variant="h6"
            color={location.pathname === '/' ? 'primary' : 'white'}
            to="/"
          >
            홈
          </Typography>
          <Typography component={Link} variant="h6" color="white" to="/charts">
            인기차트
          </Typography>
          <Typography
            component={Link}
            variant="h6"
            color={location.pathname === '/playlists' ? 'primary' : 'white'}
            to="/playlists"
          >
            플레이리스트
          </Typography>
        </Box>
      </Box>
    </NavRoot>
  );
};

const NavRoot = styled(Box)({
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: '1rem 0 0 0 ',

  '.nav-box': {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 10,
  },
  '.button-box': {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
});

export default NavBar;
