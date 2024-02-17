import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

const Wallpaper = () => {
  return (
    <HomeWrapper>
      <Overlay>
        <Typography variant="h5" component="p" color="common.white">
          유튜브에서 듣고싶은 노래를
          <br />
          위플리에서 감상하세요.
        </Typography>
        <LoginButton variant="contained">로그인하기</LoginButton>
      </Overlay>
      <WallpaperImage src="/Images/Wallpaper.jpg" alt="Wallpaper" />
    </HomeWrapper>
  );
};

export default Wallpaper;

const HomeWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '300px',
  borderRadius: '25px',
  position: 'relative',
  overflow: 'hidden',
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
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
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  zIndex: 1,
});
