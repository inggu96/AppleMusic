import { logoutAction } from '@/state/authSlice';
import { RootState } from '@/state/store';
import { Box, Button, styled, Typography } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const logout = () => {
    googleLogout();
    Cookies.remove('weply_access');
    dispatch(logoutAction());
  };
  return (
    <NavRoot>
      <Box className="nav-box">
        <Box className="nav-logo">
          <Typography color="white" variant="h5">
            나의 웹사이트
          </Typography>
          {isLoggedIn && (
            <Button onClick={() => logout()} variant="contained" sx={{ mt: 2 }}>
              <Typography color="white"> 로그아웃</Typography>
            </Button>
          )}
        </Box>
        <Box className="button-box">
          <Typography
            component={Link}
            variant="h6"
            color={location.pathname === '/' ? 'primary' : 'white'}
            to="/"
          >
            홈
          </Typography>
          <Typography
            component={Link}
            variant="h6"
            color={location.pathname === '/charts' ? 'primary' : 'white'}
            to="/charts"
          >
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
  '.nav-logo': {
    display: 'flex',
    justifyContent: 'space-between',
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
