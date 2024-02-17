import { Box, Container, Divider, styled, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ListModal from './ListModal';
import List from './List';
import Wallpaper from './Wallpaper';

const Home = () => {
  const loading = useSelector((state: any) => state.videos.loading);
  const error = useSelector((state: any) => state.videos.error);
  const { id } = useParams();

  if (error) {
    return <div>error</div>;
  }

  return (
    <HomeRoot id="page">
      <Box className="title">
        <Typography color="white" sx={{ fontSize: '1.6rem' }}>
          둘러보기
        </Typography>
        <Divider />
      </Box>
      <Wallpaper />
      <Box className="title">
        <Typography color="white" sx={{ fontSize: '1.6rem' }}>
          추천 노래리스트
        </Typography>
        <Divider />
      </Box>
      <AnimatePresence>{id && <ListModal id={id} />}</AnimatePresence>
      <List selectedId={id !== undefined ? id : ''} />
    </HomeRoot>
  );
};
export default Home;

const HomeRoot = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px',
  rowGap: '30px',
  overflowY: 'auto',
  maxWidth: '900px',
  '.title': {
    fontSize: '2rem',
    fontWeight: 300,
    textAlign: 'left',
    color: '#302f2f',
  },
});
