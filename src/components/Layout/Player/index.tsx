import { useEffect, useState } from 'react';
import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReactPlayer from 'react-player';

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { RootState } from '@/state/store';
import { setCurrentIndex, togglePlay } from '@/state/playbackSlice';

interface MusicProps {
  playerRef?: React.RefObject<ReactPlayer>;
  playing?: boolean;
  volume?: number;
  playedSeconds?: number;
  duration?: number;
  setProgress?: (progress: number) => void;
  currentTime?: number;
  progress?: number;
  setCurrentTime?: (time: number) => void;
  setVolume?: (volume: number) => void;
  setDurationSeconds?: (duration: number) => void;
  setPlayedSeconds?: (playedSeconds: number) => void;
}

const Player = ({
  playerRef,
  playedSeconds,
  duration,
  setProgress,
  currentTime,
  setCurrentTime,
  volume,
  setVolume,
  progress,
  playing,
}: MusicProps) => {
  const dispatch = useDispatch();
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [seekValue, setSeekValue] = useState(playedSeconds);
  const selectedTitle = useSelector(
    (state: RootState) => state.playback.selectedTitle,
  );
  const selectedChannelTitle = useSelector(
    (state: RootState) => state.playback.selectedChannelTitle,
  );
  const { videoList, currentIndex } = useSelector(
    (state: RootState) => state.playback,
  );
  const isPlaying = useSelector((state: RootState) => state.playback.playing);

  const handleNext = () => {
    if (currentIndex < videoList.length - 1) {
      dispatch(setCurrentIndex(currentIndex + 1));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentIndex(currentIndex - 1));
    }
  };

  // 현재 비디오 ID 가져오기
  const currentVideoId = videoList[currentIndex]?.id.videoId;

  const handleVolumeToggle = () => {
    console.log('정지');
    // if (volume === 0) {
    //   setVolume(previousVolume);
    // } else {
    //   setPreviousVolume(volume);
    //   setVolume(0);
    // }
  };
  const handlePlayPauseClick = () => {
    dispatch(togglePlay());
    console.log('시작');
  };

  const handleSeekChange = (event: any) => {
    const { value } = event.target;
    setSeekValue(parseFloat(value));
  };

  useEffect(() => {
    const updateSeekValue = () => {
      setSeekValue(playedSeconds);
    };

    updateSeekValue();
  }, [playedSeconds]);
  const formatTime = (value: any) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(playerRef.current.getCurrentTime());
  //     setProgress((playerRef.current.getCurrentTime() / duration) * 100);
  //   }, 100);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <ControlsWrap>
      <TimeBarContainer>
        <TimeBar
          type="range"
          max={duration}
          min={0}
          color="gray"
          step={1}
          value={seekValue}
          onChange={handleSeekChange}
          // onMouseUp={() => {
          //   playerRef?.current.seekTo(seekValue);
          // }}
          // onTouchEnd={() => {
          //   playerRef.current.seekTo(seekValue);
          // }}
        />
      </TimeBarContainer>
      <ControlsContainer>
        {/* <VolumeControl volume={volume * 100}> */}
        <VolumeControl>
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
            // onChange={(event) => {
            //   setVolume(event.target.valueAsNumber);
            // }}
          />
        </VolumeControl>

        <ControlsItem>
          <p>{selectedTitle}</p>
          <p>{selectedChannelTitle}</p>
        </ControlsItem>
        <TimeControls>
          <ControlsTime>{formatTime(duration)}</ControlsTime>
          <ControlsTime>{formatTime(currentTime)}</ControlsTime>
        </TimeControls>
        <Box>
          <Button>
            <FastRewindIcon onClick={handlePrev} />
          </Button>
          <Button onClick={handlePlayPauseClick}>
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 50 }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 50 }} />
            )}
          </Button>
          <Button>
            <FastForwardIcon onClick={handleNext} />
          </Button>
        </Box>
      </ControlsContainer>
    </ControlsWrap>
  );
};

export default Player;

const ControlsWrap = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '80px',
  margin: 'auto',
  padding: 0,
  backgroundColor: '#161616',
});
const TimeBarContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '3px',
});

const TimeBar = styled('input')({
  backgroundColor: '#D60017',
  height: '100%',
  width: '100%',
});
const VolumeControl = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& input[type="range"]': {
    WebkitAppearance: 'none',
    height: '100%',
    background: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      // background: volume ? '#D60017' : '#D9D9D9',
      marginTop: '-5px',
      cursor: 'pointer',
    },
    '&::-webkit-slider-runnable-track': {
      height: '0.4rem',
      // background: volume
      //   ? `linear-gradient(to right, #D60017 ${volume}%, #D9D9D9 ${volume}% 100%)`
      //   : '#E5E7EB',
      opacity: '1',
      borderRadius: '3rem',
      transition: 'all 0.5s',
      cursor: 'pointer',
    },
  },
  '.volume-icon': {
    // opacity: volume ? '1' : '0.8',
    // background: volume ? '#D60017' : '#E5E7EB',
  },
}));

const ControlsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '50px',
  marginTop: '10px',
  columnGap: '30px',
});

const ControlsVolume = styled(Box)({
  width: '200px',
});

const ControlsItem = styled(Box)({
  justifyContent: 'center',
  border: '1px solid #C4C4C4',
  '& .controlsImg': {
    alignItems: 'center',
    borderRight: '1px solid #C4C4C4',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    backgroundColor: 'rgba(60, 60, 67, 0.1)',
  },
});

const TimeControls = styled(Box)({
  flexDirection: 'column',
  columnGap: '5px',
  '& > p': {
    color: '#C4C4C4',
  },
});

const ControlsTime = styled('p')({
  color: 'black',
  fontSize: '12px',
});

const ButtonBox = styled(Box)({});
