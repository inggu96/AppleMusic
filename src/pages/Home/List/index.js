import { data } from '../Data';
import Item from '../Item';
import styles from './list.module.scss';

const List = ({ selectedId }) => {
  return (
    <div className={styles.listWrap}>
      <ul className={styles.list}>
        {data.map((item) => (
          <Item key={item.id} {...item} isSelected={item.id === selectedId} />
        ))}
      </ul>
    </div>
  );
};

export default List;
