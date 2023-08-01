import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './item.module.scss';

const Item = ({ id, title, category, isSelected }) => {
  return (
    <li className={styles.item}>
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
                style={{ width: '300px', height: '300px' }}
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
