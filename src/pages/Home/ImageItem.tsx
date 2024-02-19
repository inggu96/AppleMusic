import { IconButton, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getList } from '../../api/hooks/getList';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

interface Images {
  [key: string]: string;
}
interface ImageItemProps {
  id: string;
  title: string;
  category: string;
  image: string;
}

const ImageItem = ({ id, title, category, image }: ImageItemProps) => {
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
    <ItemContainer>
      <motion.div
        className="imageBox"
        onClick={handleItemClick}
        layoutId={`item-motion-${id}`}
      >
        <Link to={`/${id}`}>
          <img className="image" src={images[id]} alt="" />
          <IconButton>
            <PlayArrowRoundedIcon className="playIcon" />
          </IconButton>
          <TextContainer>
            <TitleText>{title}</TitleText>
            <CategoryText>{category}</CategoryText>
          </TextContainer>
        </Link>
      </motion.div>
    </ItemContainer>
  );
};

export default ImageItem;

const ItemContainer = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  width: '45vw',
  maxWidth: '270px',
  padding: '10px',
  overflow: 'hidden',
  position: 'relative',
  '.imageBox': {
    '&:hover .image': {
      filter: 'brightness(50%)',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    '&:hover .playIcon': {
      display: 'flex',
    },
    '.image': {
      transition: 'filter 0.5s ease',
      width: '100%',
      height: '45vw',
      maxHeight: '270px',
      objectFit: 'cover',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    },
    '.playIcon': {
      opacity: 0.75,
      display: 'none',
      position: 'absolute',
      bottom: 30,
      left: 10,
      color: 'red',
      backgroundColor: 'white',
      fontSize: '3rem',
      borderRadius: '50%',
      transition: '0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
      zIndex: 2,
    },
  },
}));

const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#fff',
}));

const CategoryText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'normal',
  color: '#848484',
}));
