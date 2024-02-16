import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Thumbnails } from '../../../components/Common';
import { searchList } from '../../../state/VideoActions';
// @ts-ignore
import { data } from '../Data';
import styles from './article.module.scss';

const Article = ({ id }) => {
  const { category, title } = data.find((data) => data.id === id);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);

  useEffect(() => {
    if (!videos?.length) {
      // 비디오가 로드되지 않았을 때만 dispatch(searchVideo()) 실행
      dispatch(searchList(title));
    }
  }, [videos]);
  return (
    <article className={styles.modalWrap}>
      <div className={styles.overlay} />
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <motion.div layoutId={`item-motion-${id}`}>
          <Link to="/">닫기</Link>

          <div className={styles.content}>
            <motion.div
              className={styles.titleMotion}
              layoutId={`title-motion-${id}`}
            >
              <span className={styles.category}>{category}</span>
              <h2 className={styles.title}>{title}</h2>
            </motion.div>
            <ul className={styles.youtubeList}>
              {videos?.map((video) => (
                <li key={video.id} className={styles.youtubeItem}>
                  <Thumbnails
                    id={video.id.videoId}
                    thumbnails={video.snippet.thumbnails.high.url}
                    title={video.snippet.title}
                    channelTitle={video.snippet.channelTitle}
                  />
                  <div className={styles.controlsTitle}>
                    <p className={styles.controlsTitleItem}>
                      {video.snippet.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default Article;
