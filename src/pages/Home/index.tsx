import { Container, Divider, styled } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Wallpaper } from '../../components/Common';
import Article from './Article';
import List from './List';

const Home = () => {
  const loading = useSelector((state: any) => state.videos.loading);
  const error = useSelector((state: any) => state.videos.error);
  const { id } = useParams();

  if (error) {
    return <div>error</div>;
  }

  return (
    <HomeRoot>
      <TextContainer>
        <p>둘러보기</p>
        <p>유튜브에서 듣고싶은 노래를 위플리에서 감상하세요.</p>
        <Divider />
      </TextContainer>
      <Wallpaper />
      <TextContainer>
        <p>추천 노래리스트</p>
        <p>주인장이 추천하는 노래리스트입니다 !</p>
        <Divider />
      </TextContainer>
      <AnimatePresence>{id && <Article id={id} />}</AnimatePresence>
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
  overflowY: 'scroll',
});

const TextContainer = styled('div')({
  width: '1200px',
  '& > p:first-child': {
    fontSize: '2rem',
    fontWeight: 300,
    textAlign: 'left',
    marginLeft: '160px',
    marginTop: '20px',
    color: '#302f2f',
  },
  '& > p': {
    color: '#302f2f',
    fontSize: '1rem',
    fontWeight: 300,
    textAlign: 'left',
    marginLeft: '160px',
    lineHeight: '35px',
  },
});
