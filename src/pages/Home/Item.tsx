import { styled } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getList } from '../../api/hooks/getList';

interface Images {
  [key: string]: string;
}
const Item = ({ id, title, category, image, isSelected }: any) => {
  const handleItemClick = async () => {
    const videoDetails = await getList(id);
    console.log(videoDetails);
  };

  const images: Images = {
    Jazz: '/Images/Jazz.jpg',
    Jannabi: '/Images/Jannabi.jpg',
    Beo: '/Images/Beo.jpg',
    Iu: '/Images/Iu.jpg',
  };

  return (
    <ItemContainer onClick={handleItemClick} className="item">
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
              <img className="image" src={images[id]} alt="" />
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </ItemContainer>
  );
};

export default Item;

const ItemContainer = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  width: '300px',
  height: '300px',
  fontSize: '3vmin',
  overflow: 'hidden',
  transition: '0.5s',
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
  },
  '& .titleMotion': {
    zIndex: 1,
    position: 'relative',
    width: '100%',
    color: '#fff',
  },
}));
