import { useEffect, useState } from 'react';
import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import styles from './controls.module.scss';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { pause, play } from '../../../state/VideoActions';
import {
  FastForwardIcon,
  FastRewindIcon,
  PauseIcon,
  PlayArrowIcon,
} from '../../../components/Common/Icons';

import { VolumeControl } from './ControlsStyles';

const playStyle = makeStyles({
  root: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
});

const fastStyle = makeStyles({
  root: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    color: '#000',
    fontSize: '30px',
    background: 'none',
    border: 'none',
  },
});

const Player = ({
  playerRef,
  playedSeconds,
  duration,
  setProgress,
  currentTime,
  setCurrentTime,
  volume,
  setVolume,
}) => {
  const playClasses = playStyle();
  const fastClasses = fastStyle();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [seekValue, setSeekValue] = useState(playedSeconds);
  const playing = useSelector((state) => state.videos.playing);
  const selectedVideoUrl = useSelector(
    (state) => state.videos.selectedVideoUrl,
  );
  const selectedTitle = useSelector((state) => state.videos.selectedTitle);
  const selectedChannelTitle = useSelector(
    (state) => state.videos.selectedChannelTitle,
  );

  const handleVolumeToggle = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };
  const handlePlayPauseClick = () => {
    if (playing) {
      dispatch(pause());
      playerRef.current?.pause();
    } else {
      dispatch(play());
      playerRef.current?.play();
    }
  };
  const handleNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 마지막 영상이면 처음으로 돌아가거나 다른 작업을 수행할 수 있습니다.
      setCurrentIndex(0);
    }
  };
  const fastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const revert = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };

  const handleSeekChange = (event) => {
    const { value } = event.target;
    setSeekValue(parseFloat(value));
  };

  useEffect(() => {
    const updateSeekValue = () => {
      setSeekValue(playedSeconds);
    };

    updateSeekValue();
  }, [playedSeconds]);
  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(playerRef.current.getCurrentTime());
      setProgress((playerRef.current.getCurrentTime() / duration) * 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.controlsWrap}>
      <div className={styles.timeBarContainer}>
        <input
          className={styles.timeBar}
          type="range"
          max={duration}
          min={0}
          color="gray"
          step={1}
          value={seekValue}
          onChange={handleSeekChange}
          onMouseUp={() => {
            playerRef.current.seekTo(seekValue);
          }}
          onTouchEnd={() => {
            playerRef.current.seekTo(seekValue);
          }}
        />
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsVolume}>
          <VolumeControl volume={volume * 100}>
            {volume === 0 ? (
              <VolumeOffRounded
                sx={{
                  color: '#D9D9D9',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
                onClick={handleVolumeToggle}
              />
            ) : (
              <VolumeUpRounded
                sx={{
                  color: '#777676',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
                onClick={handleVolumeToggle}
              />
            )}
            <input
              type="range"
              min={0}
              max={1}
              color="gray"
              step={0.02}
              value={volume}
              onChange={(event) => {
                setVolume(event.target.valueAsNumber);
              }}
            />
          </VolumeControl>
        </div>

        <div className={styles.controlsItem}>
          <img
            className={styles.controlsImg}
            src={
              selectedVideoUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png?20200509031052'
            }
            alt={selectedVideoUrl ? 'Thumbnail' : 'No Thumbnail'}
          />
          <div className={styles.controlsTitle}>
            <p>{selectedTitle}</p>
            <p>{selectedChannelTitle}</p>
          </div>
        </div>
        <div className={styles.timecontrols}>
          <p className={styles.controlsTime}>{formatTime(duration)}</p>
          <p className={styles.controlsTime}>{formatTime(currentTime)}</p>
        </div>
        <button className={fastClasses.root}>
          <FastRewindIcon />
        </button>
        <button className={playClasses.root} onClick={handlePlayPauseClick}>
          {playing ? (
            <PauseIcon sx={{ fontSize: 50 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 50 }} />
          )}
        </button>
        <button className={fastClasses.root} onClick={handleNextVideo}>
          <FastForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default Player;
