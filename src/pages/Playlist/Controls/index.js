import { useEffect, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

import styles from './controls.module.scss';
import { makeStyles } from '@mui/styles';
import { Slider } from '@mui/material';

const playStyle = makeStyles({
  root: {
    width: '82px',
    height: '32px',
    cursor: 'pointer',
    color: '#000',
    border: '3px solid black',
    fontSize: '50px',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const fastStyle = makeStyles({
  root: {
    width: '140px',
    height: '40px',
    cursor: 'pointer',
    color: '#000',
    border: '3px solid black',
    fontSize: '50px',
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
}) => {
  const playclasses = playStyle();
  const fastclasses = fastStyle();
  const fastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const revert = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };
  const seek = (e) => {
    playerRef.current.seekTo(+e.target.value, 'seconds');
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

  return (
    <div>
      <Slider
        marks={false}
        max={duration}
        min={0}
        value={playedSeconds}
        valueLabelDisplay="auto"
        onChange={seek}
        valueLabelFormat={formatTime}
      />

      <div className={styles.controls}>
        <FastRewindIcon
          className={fastclasses.root}
          onClick={() => {
            revert();
          }}
        />
        <button
          className={playclasses.root}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </button>

        <FastForwardIcon
          className={fastclasses.root}
          onClick={() => {
            fastForward();
          }}
        />
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
    </div>
  );
};

export default Controls;
