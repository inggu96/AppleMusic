import { Category } from '@mui/icons-material';
import { styled } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchList } from '../../../state/VideoActions';
// import styles from './item.module.scss';
// import Jazz from '../../../asset/Images/Jazz.jpg';
// import Jannabi from '../../../asset/Images/Jannabi.jpg';
// import Beo from '../../../asset/Images/Beo.jpg';
// import Iu from '../../../asset/Images/Iu.jpg';

const Item = ({ id, title, category, image, isSelected }: any) => {
  const dispatch = useDispatch();
  const videos = useSelector((state: any) => state.videos.videos);

  // const selectedId = () => {
  //   const existingData = videos.find((video : any) => video.category === category);

  //   if (existingData) {
  //     console.log('이미 데이터가 있습니다.');
  //   } else {
  //     console.log('데이터를 가져옵니다.');
  //     dispatch(searchList(category));
  //   }
  // };

  // const images = {
  //   Jazz,
  //   Jannabi,
  //   Beo,
  //   Iu,
  // };

  return (
    // <li onClick={selectedId} className="item">
    <ItemContainer className="item">
      <motion.div layoutId={`item-motion-${id}`}>
        <Link to={`/${id}`} className="link">
          <div className="content">
            <motion.div className="titleMotion" layoutId={`title-motion-${id}`}>
              <span className="category">{category}</span>
              <h2 className="title">{title}</h2>
            </motion.div>
            <motion.div
              className="imageMotion"
              aria-hidden="true"
              layoutId={`image-motion-${id}`}
            >
              {/* <img className="image" src={images[id]} alt="" /> */}
              <img className="image" alt="" />
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </ItemContainer>
  );
};

export default Item;

const ItemContainer = styled('li')(({ theme }) => ({
  flex: 1,
  position: 'relative',
  width: '30vmin',
  height: '40vmin',
  fontSize: '3vmin',
  overflow: 'hidden',
  transition: '0.5s',
  borderRadius: '10px',
  '&:hover': {
    flex: 3,
    transition: '0.5s',
  },
  '& > div': {
    width: '100%',
    height: '100%',
  },
  '& a': {
    display: 'block',
    width: '100%',
    height: '100%',
    color: 'inherit',
    textDecoration: 'none',
  },
  '& .content': {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '5vmin',
  },
  '& .imageMotion': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    '&:after': {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      content: '""',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '&:hover .image': {
      filter: 'grayscale(0) !important',
      transition: 'filter 0.5s',
    },
  },
  '& .image': {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(1)',
    transition: 'filter 0.5s',
    userSelect: 'none',
    '&:hover': {
      filter: 'grayscale(0) !important',
      transition: 'filter 0.5s',
    },
  },
  '& .titleMotion': {
    zIndex: 1,
    position: 'relative',
    width: '100%',
    color: '#fff',
  },
  '& .category': {
    fontSize: '90%',
  },
  '& .content .title': {
    margin: '1.4vmin 0',
  },
}));
