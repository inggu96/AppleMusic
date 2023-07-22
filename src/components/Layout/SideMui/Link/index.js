import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '../Icons';
import styles from './item.module.scss';

const DynamicItem = (props) => {
  const { page } = props;
  if (page === 'homepage') {
    return <div className={styles.page}></div>;
  } else {
    return (
      <div className={styles.page}>
        <Link to="/">
          <button className={styles.btn}>
            <ArrowBackIcon /> Back
          </button>
        </Link>
        {page}
      </div>
    );
  }
};

export default DynamicItem;
