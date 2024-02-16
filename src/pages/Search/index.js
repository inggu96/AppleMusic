import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../state/VideoActions';
import styles from './music.module.scss';

import { Thumbnails } from '../../components/Common';

const Search = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const [isPlayerVisible, setPlayerVisible] = useState(false);

  const togglePlayer = () => {
    setPlayerVisible(!isPlayerVisible);
  };

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  if (loading) {
    return (
      <div className={styles.error}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className={styles.youtubeWrap}>
      <p>플레이리스트</p>
      <div className={styles.youtubeContent}>
        <ul className={styles.youtubeList}>
          {videos.map((video) => (
            <li key={video.id} className={styles.youtubeItem}>
              <Thumbnails
                id={video.id}
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
    </div>
  );
};

export default Search;
