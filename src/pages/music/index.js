import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import styles from './music.module.scss';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { fetchList, setSelectedVideoUrl } from '../../state/VideoActions';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const PlayListAddStyle = makeStyles({
  root: {
    width: '50px',
    height: '52px',
    fontSize: '30px',
    cursor: 'pointer',
  },
});

const PlayListStyle = makeStyles({
  root: {
    width: '220px',
    height: '52px',
    padding: '40px',
  },
});

const Player = () => {
  const PlayListAddclasses = PlayListAddStyle();
  const PlayListclasses = PlayListStyle();
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
  const [volume, setVolume] = useState(1);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const playerRef = useRef();

  const handleThumbnailClick = (videoUrl, thumbnailId, title, channelTitle) => {
    setSelectedVideoUrl(videoUrl);
    setPlaying(false);
    setSelectedThumbnailId(thumbnailId);
    setSelectedTitle(title);
    setSelectedChnnelTitle(channelTitle);
  };
  const handleSearch = (searchValue) => {
    dispatch(fetchList(searchValue));
  };

  const PleaseLogin = () => {
    alert('로그인을 해주세요');
  };
  return (
    <div className={styles.youtubeWrap}>
      <p>인기음악</p>
      <div className={styles.youtubeContent}>
        <ul className={styles.youtubeList}>
          {videos.map((video, idx) => (
            <li className={styles.youtubeItem}>
              <div>
                <img
                  key={video.id.videoId}
                  onClick={() =>
                    handleThumbnailClick(
                      video.id.videoId,
                      video.snippet.thumbnails.high.url,
                      video.snippet.title,
                      video.snippet.channelTitle,
                    )
                  }
                  className={styles.thumbnailImage}
                  src={video.snippet.thumbnails.high.url}
                  alt="Thumbnail"
                />
                <div className={styles.controlsTitle}>
                  <p className={styles.ranking}> {idx + 1} </p>
                  <p className={styles.rankingChange}> - </p>
                  <p className={styles.controlsTitleItem}>
                    {video.snippet.title}
                  </p>
                  <p>
                    <PlaylistAddIcon
                      onClick={PleaseLogin}
                      className={PlayListAddclasses.root}
                      sx={{ fontSize: 30 }}
                    />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
        volume={volume}
        setVolume={setVolume}
        searchValue={searchValue}
        onSearch={handleSearch}
      />
      <Accordion
        expanded={isPlayerVisible}
        onChange={() => setPlayerVisible(!isPlayerVisible)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="player-content"
          id="player-header"
        >
          <Typography>플레이어</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
            volume={volume}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Player;
