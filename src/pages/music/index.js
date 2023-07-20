import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import styles from './music.module.scss';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos } from '../../state/VideoActions';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Navigate, useNavigate } from 'react-router-dom';
import { Thumbnails } from '../../components/Common/Thumbnails';

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
  const navigate = useNavigate();
  const PlayListAddclasses = PlayListAddStyle();
  const PlayListclasses = PlayListStyle();
  const playerRef = useRef();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const selectedVideoUrl = useSelector(
    (state) => state.videos.selectedVideoUrl,
  );
  const selectedVideoId = useSelector((state) => state.videos.selectedVideoId);

  const [progress, setProgress] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const togglePlayer = () => {
    setPlayerVisible(!isPlayerVisible);
  };

  const handleSearch = (searchValue) => {
    dispatch(searchVideos(searchValue));
    console.log(searchVideos(searchValue));
  };
  useEffect(() => {
    dispatch(searchVideos());
  }, []);

  const PleaseLogin = () => {
    alert('로그인을 해주세요');
  };

  if (loading) {
    return (
      <div className={styles.error}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <div onClick={handleSearch}>error</div>;
  }

  return (
    <div className={styles.youtubeWrap}>
      <p>잔나비 플레이리스트</p>
      <Accordion
        expanded={isPlayerVisible}
        onChange={togglePlayer}
        sx={{ position: 'fixed', bottom: '0', right: '0' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="player-content"
          id="player-header"
        ></AccordionSummary>
        <AccordionDetails>
          <ReactPlayer
            controls={false}
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${selectedVideoId}`}
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
      <div className={styles.youtubeContent}>
        <ul className={styles.youtubeList}>
          {videos.map((video, idx) => (
            <li key={video.id} className={styles.youtubeItem}>
              <Thumbnails
                id={video.id}
                thumbnails={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                channelTitle={video.snippet.channelTitle}
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
                    sx={{ fontSize: 27 }}
                  />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Controls
        playerRef={playerRef}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
        progress={progress}
        setProgress={setProgress}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        volume={volume}
        setVolume={setVolume}
        searchValue={searchValue}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Player;
