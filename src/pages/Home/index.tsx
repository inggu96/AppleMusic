import { Box, Container, Divider, styled, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from '@/components/Layout';
import List from './List';
import ListModal from './ListModal';
import Wallpaper from './Wallpaper';
import useAuth from '@/api/hooks/useAuth';

const Home = () => {
  const { id } = useParams();

  return (
    <Layout id="page">
      <Wallpaper />
      <Box className="title">
        <Typography color="white" sx={{ fontSize: '1.6rem' }}>
          추천 노래리스트
        </Typography>
        <Divider />
      </Box>
      <AnimatePresence>{id && <ListModal id={id} />}</AnimatePresence>
      <List selectedId={id !== undefined ? id : ''} />
    </Layout>
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
});
