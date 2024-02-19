import useAuth from '@/api/hooks/useAuth';
import { loginAction } from '@/state/authSlice';
import { RootState } from '@/state/store';
import { Box, Button, styled, Typography } from '@mui/material';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

const Wallpaper = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      Cookies.set('weply_access', tokenResponse.access_token, { expires: 1 });
      dispatch(loginAction());
    },
    scope: 'profile email https://www.googleapis.com/auth/youtube.readonly',
  });

  return (
    <HomeWrapper>
      <Box className="Wallpaper-text">
        <Typography
          color="white"
          sx={{ fontSize: '1.6rem', textAlign: 'left' }}
        >
          둘러보기
        </Typography>
      </Box>
      <Box className="Wallpaper-box">
        <Overlay>
          <Typography variant="h5" component="p" color="common.white">
            유튜브에서 듣고싶은 노래를
            <br />
            위플리에서 감상하세요.
          </Typography>
          {!isLoggedIn && (
            <LoginButton onClick={() => login()} variant="contained">
              <Typography color="common.white">로그인하기</Typography>
            </LoginButton>
          )}
        </Overlay>
        <WallpaperImage src="/Images/Wallpaper.jpg" alt="Wallpaper" />
      </Box>
    </HomeWrapper>
  );
};

export default Wallpaper;

const HomeWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '30px',
  width: '100%',
  '.Wallpaper-text': {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  '.Wallpaper-box': {
    width: '100%',
    position: 'relative',
    height: '300px',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    backgroundColor: '#424242',
  },
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 2,
  '& >p': {
    textAlign: 'center',
  },
});

const LoginButton = styled(Button)({
  marginTop: '20px',
});

const WallpaperImage = styled('img')({
  width: '100%',
  height: '295px',
  objectFit: 'cover',
  position: 'absolute',
  zIndex: 1,
  borderRadius: '25px',
});
