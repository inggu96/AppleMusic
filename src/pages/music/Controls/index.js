import { useEffect, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import styles from './controls.module.scss';
import { makeStyles } from '@mui/styles';
import { Slider } from '@mui/material';
import { debounce } from 'lodash';

const playStyle = makeStyles({
  root: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    color: '#d60017',
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

const Controls = ({
  playerRef,
  playing,
  setPlaying,
  playedSeconds,
  duration,
  setProgress,
  currentTime,
  setCurrentTime,
  selectedThumbnailId,
  selectedTitle,
  selectedChnnelTitle,
  volume,
  setVolume,
}) => {
  const playclasses = playStyle();
  const fastclasses = fastStyle();
  const fastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const revert = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };
  const debouncedSeek = debounce((value) => {
    playerRef.current.seekTo(+value, 'seconds');
  }, 200); // 적절한 디바운스 시간 설정

  // onChange 핸들러에 debouncedSeek 함수 전달
  const handleSeekChange = (e, value) => {
    debouncedSeek(value);
  };

  /* 타임바 시간 */
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    playerRef.current.setVolume(newVolume); // 볼륨 변경
  };

  return (
    <div className={styles.controlsWrap}>
      <Slider
        marks={false}
        max={duration}
        min={0}
        value={playedSeconds}
        valueLabelDisplay="auto"
        onChange={handleSeekChange}
        valueLabelFormat={formatTime}
      />

      <div className={styles.controls}>
        <div className={styles.controlsImgWrap}>
          <div className={styles.controlsVolume}>
            <Slider
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className={styles.controlsItem}>
            <img
              className={styles.controlsImg}
              src={selectedThumbnailId}
              alt="Thumbnail"
            />
          </div>
          <div className={styles.controlsTitle}>
            <p>{selectedTitle}</p>
            <p>{selectedChnnelTitle}</p>
          </div>
        </div>
        <div className={styles.timecontrols}>
          {/* 전체시간 */}
          <p className={styles.controlsTime}>
            {Math.floor(duration / 60) +
              ':' +
              ('0' + Math.floor(duration % 60)).slice(-2)}
          </p>

          {/* 현재시간 */}
          <p className={styles.controlsTime}>
            {Math.floor(currentTime / 60) +
              ':' +
              ('0' + Math.floor(currentTime % 60)).slice(-2)}
          </p>
        </div>
        <button
          className={fastclasses.root}
          onClick={() => {
            revert();
          }}
        >
          <FastRewindIcon />
        </button>
        <button
          className={playclasses.root}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <button
          className={fastclasses.root}
          onClick={() => {
            fastForward();
          }}
        >
          <FastForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default Controls;
