import { Box, Modal, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getList } from '../../api/hooks/getList';
import { data } from './Data';
import ListTable from './ListTable';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect } from 'react';

interface Video {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnails: string;
}

interface Images {
  [key: string]: string;
}
const ListModal = ({ id }: any) => {
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery<SearchResult[]>(['videos', id], () => getList(id), {
    staleTime: 1000 * 60 * 5,
  });

  const videos: Video[] =
    searchResults?.map(
      (result): Video => ({
        videoId: result.id.videoId,
        title: result.snippet.title,
        channelTitle: result.snippet.channelTitle,
        thumbnails: result.snippet.thumbnails.high.url,
      }),
    ) || [];

  const { category, title }: any = data.find((data) => data.id === id);

  const images: Images = {
    Jazz: '/Images/Jazz.jpg',
    Jannabi: '/Images/Jannabi.jpg',
    Beo: '/Images/Beo.jpg',
    Iu: '/Images/Iu.jpg',
  };
  const selectedImage = images[id] || '';

  return (
    <MotionModal
      open={true}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      <Box>
        <Content className="content">
          <Link to="/">
            <CloseOutlinedIcon className="cancel" />
          </Link>
          <Box className="header">
            <Box>
              {selectedImage && (
                <img src={selectedImage} alt={title} width="150px" />
              )}
            </Box>
            <Box>
              <Typography
                color="white"
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  paddingBottom: '25px',
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>
          <YoutubeList>
            <ListTable videos={videos} />
          </YoutubeList>
        </Content>
      </Box>
    </MotionModal>
  );
};

export default ListModal;

const MotionModal = motion(Modal);
({
  zIndex: 9999,
  position: 'fixed',
  overflowY: 'scroll',
  boxShadow: '20px 12px 20px 14px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
  margin: 'auto',
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#000',
  width: '70%',
  height: '50%',
  maxWidth: '900px',
  margin: 'auto',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 96px)',
  transform: 'translate(0%, 5%)',
  position: 'relative',
  '&>a': {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  '.header': {
    padding: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '30px',
  },
});

const YoutubeList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  height: '25%',
  '.List': {
    display: 'grid',
    gridGap: '16px',
    padding: '16px',
    overflow: 'hidden',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // 반응형 그리드 컬럼 설정
    '@media (max-width:600px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    },
    overflowY: 'scroll',
  },
}));
