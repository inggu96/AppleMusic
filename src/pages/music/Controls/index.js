import { useEffect, useRef, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

import styles from './controls.module.scss';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import { Slider } from '@mui/material';
import { debounce } from 'lodash';
import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';

const VolumeControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  width: 6rem;

  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;

    &:focus {
      outline: none;
    }

    //WEBKIT
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? '#D60017' : '#D9D9D9')};
      margin-top: -5px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right,#D60017 ${props.volume}%,  #D9D9D9
 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.8')};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }
    .volume-icon {
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.8')};
      background: ${(props) => (props.volume ? '#D60017' : '#E5E7EB')};
    }
    
`;

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
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const fastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const revert = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };

  const handleSeekChange = (e, value) => {
    playerRef.current.seekTo(value);
  };
  const handleVolumeToggle = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
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
    <div className={styles.controlsWrap}>
      <div className={styles.time_progressbarContainer}>
        <input
          className={styles.time_progressBar}
          type="range"
          max={duration}
          min={0}
          color="gray"
          step={0.02}
          value={playedSeconds}
          onChange={(event) => {
            const { value } = event.target;
            playerRef.current.seekTo(value);
          }}
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.controlsImgWrap}>
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
          {playing ? (
            <PauseIcon sx={{ fontSize: 50 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 50 }} />
          )}
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
