import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import styles from './music.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchList, setSelectedVideoUrl } from '../../state/VideoActions';

const Player = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);

  useEffect(() => {
    dispatch(fetchList()); // 컴포넌트 마운트 시 검색 수행
  }, []);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedChnnelTitle, setSelectedChnnelTitle] = useState(null);

  const playerRef = useRef();

  const handleThumbnailClick = (videoUrl, thumbnailId, title, channelTitle) => {
    setSelectedVideoUrl(videoUrl);
    setPlaying(false);
    setSelectedThumbnailId(thumbnailId);
    setSelectedTitle(title);
    console.log(title);
    setSelectedChnnelTitle(channelTitle);
  };

  return (
    <div>
      <ReactPlayer
        controls={false}
        playing={playing}
        url={`https://www.youtube.com/watch?v=${selectedVideoUrl}`}
        ref={playerRef}
        onProgress={(e) => {
          const { played, playedSeconds } = e;
          setProgress(played * 100);
          setPlayedSeconds(playedSeconds);
        }}
        onSeek={setPlayedSeconds}
        onDuration={setDurationSeconds}
        progressInterval={1000}
      />
      <ul className={styles.youtubeList}>
        {videos.map((video) => (
          <li
            key={video.id.videoId}
            onClick={() =>
              handleThumbnailClick(
                video.id.videoId,
                video.snippet.thumbnails.high.url,
                video.snippet.title,
                video.snippet.channelTitle,
              )
            }
            className={styles.youtubeItem}
          >
            <div className={styles.youtubeImg}>
              <img
                key={video.id.videoId}
                className={styles.thumbnailImage}
                src={video.snippet.thumbnails.high.url}
                alt="Thumbnail"
              />
            </div>
          </li>
        ))}
      </ul>
      <Controls
        playerRef={playerRef}
        playing={playing}
        setPlaying={setPlaying}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
        progress={progress}
        setProgress={setProgress}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        selectedThumbnailId={selectedThumbnailId}
        selectedTitle={selectedTitle}
        selectedChnnelTitle={selectedChnnelTitle}
      />
    </div>
  );
};

export default Player;
