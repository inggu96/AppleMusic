import React, { useEffect, useState } from 'react';
import styles from './youtube.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../state/VideoActions';

const Youtube = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);

  const [query, setQuery] = useState('');

  const handleSearch = () => {
    dispatch(
      fetchVideos({
        part: 'snippet',
        maxResult: 10,
        q: query,
        order: 'relevance',
        key: 'YOUR_YOUTUBE_API_KEY',
      }),
    );
  };

  useEffect(() => {
    handleSearch(); // 컴포넌트 마운트 시 검색 수행
  }, [dispatch]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <main className={styles.youtubeWrap}>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {videos.map((video) => (
        <ul key={video.snippet.title} className={styles.youtubeListWrap}>
          <li>
            <div className={styles.youtubeList}>
              <img
                className={styles.youtubeImg}
                src={video.snippet.thumbnails.medium.url}
                alt="썸네일"
              />
            </div>
          </li>
          <div className={styles.youtubeText}>{video.snippet.title}</div>
        </ul>
      ))}
    </main>
  );
};

export default Youtube;
