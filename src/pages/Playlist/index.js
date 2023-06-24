import React, { useEffect, useRef } from 'react';
import styles from './playlist.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList, setSelectedVideoUrl } from '../../state/VideoActions';
import ReactPlayer from 'react-player';
import { CircularProgress } from '@mui/material';

const Youtube = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const selectedVideoUrl = useSelector(
    (state) => state.videos.selectedVideoUrl,
  );

  useEffect(() => {
    dispatch(fetchList()); // 컴포넌트 마운트 시 검색 수행
  }, []);

  const handleVideoClick = (url) => {
    dispatch(setSelectedVideoUrl(url));
  };

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
    <main className={styles.youtubeWrap}>
      <div className={styles.youtubeListWrap}>
        <ul className={styles.youtubeList}>
          {videos.map((video) => (
            <li key={video.id.videoId} className={styles.youtubeItem}>
              <div className={styles.youtubeItem}>
                <ReactPlayer
                  className={styles.youtubeContent}
                  url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  width="100%"
                  height="100%"
                  poster={video.snippet.thumbnails.default.url}
                  controls={false} // 기본 컨트롤 비활성화
                />
              </div>
              <div className={styles.youtubeText}>{video.snippet.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Youtube;
