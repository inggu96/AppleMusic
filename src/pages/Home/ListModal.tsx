import { Modal, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getList } from '../../api/hooks/getList';
import { data } from './Data';
import ListTable from './ListTable';
import { useEffect } from 'react';

interface Video {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnails: string;
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

  useEffect(() => {
    console.log('videos22', videos);
  });
  return (
    <MotionModal
      open={true}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      <motion.div className="coco" layoutId={`item-motion-${id}`}>
        <Content className="content">
          <Link to="/">닫기</Link>
          <motion.div className="titleMotion" layoutId={`title-motion-${id}`}>
            <span className="category">{category}</span>
            <h2 className="title">{title}</h2>
          </motion.div>
          <YoutubeList>
            <ListTable videos={videos} />
          </YoutubeList>
        </Content>
      </motion.div>
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
  backgroundColor: '#fff',
  width: '70%',
  height: '50%',
  maxWidth: '900px',
  margin: 'auto',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 96px)',
  transform: 'translate(0%, 5%)',
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
