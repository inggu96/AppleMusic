import { Category } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchList } from '../../../state/VideoActions';
import styles from './item.module.scss';
import Jazz from '../../../asset/Images/Jazz.jpg';
import Jannabi from '../../../asset/Images/Jannabi.jpg';
import Beo from '../../../asset/Images/Beo.jpg';
import Iu from '../../../asset/Images/Iu.jpg';

const Item = ({ id, title, category, image, isSelected }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);

  const selectedId = () => {
    const existingData = videos.find((video) => video.category === category);

    if (existingData) {
      console.log('이미 데이터가 있습니다.');
    } else {
      console.log('데이터를 가져옵니다.');
      dispatch(searchList(category));
    }
  };

  const images = {
    Jazz,
    Jannabi,
    Beo,
    Iu,
  };

  return (
    <li onClick={selectedId} className={styles.item}>
      <motion.div layoutId={`item-motion-${id}`}>
        <Link to={`/${id}`} className={styles.link}>
          <div className={styles.content}>
            <motion.div
              className={styles.titleMotion}
              layoutId={`title-motion-${id}`}
            >
              <span className={styles.category}>{category}</span>
              <h2 className={styles.title}>{title}</h2>
            </motion.div>
            <motion.div
              className={styles.imageMotion}
              aria-hidden="true"
              layoutId={`image-motion-${id}`}
            >
              <img className={styles.image} src={images[id]} alt="" />
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </li>
  );
};

export default Item;
