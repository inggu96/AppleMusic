import React, { useEffect, useState } from 'react';
import styles from './youtube.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../state/VideoActions';
import ReactPlayer from 'react-player';

const Youtube = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  console.log(videos);

  useEffect(() => {
    dispatch(fetchVideos()); // 컴포넌트 마운트 시 검색 수행
    console.log(dispatch(fetchVideos()));
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <main className={styles.youtubeWrap}>
      {videos.map((video) => (
        <>
          <ul key={video.snippet.title} className={styles.youtubeListWrap}>
            <li>
              <div>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  controls
                />
              </div>
            </li>
            <div className={styles.youtubeText}>{video.snippet.title}</div>
          </ul>
        </>
      ))}
    </main>
  );
};

export default Youtube;
