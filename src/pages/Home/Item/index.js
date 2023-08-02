import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchList } from '../../../state/VideoActions';
import styles from './item.module.scss';

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
              <img
                className={styles.image}
                src={`https://source.unsplash.com/random/${id}`}
                alt=""
              />
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </li>
  );
};

export default Item;
