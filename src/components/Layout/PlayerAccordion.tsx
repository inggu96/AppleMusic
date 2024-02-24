import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setCurrentPlaybackTime } from '@/state/videoIdSlice';
import Player from './Player';
import { setCurrentIndex } from '@/state/playbackSlice';

const PlayerAccordion = () => {
  const dispatch = useDispatch();
  const playerRef = useRef<ReactPlayer | null>(null);
  const [progress, setProgress] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const selectedVideoId = useSelector(
    (state: RootState) => state.videoId.selectedVideoId,
  );
  const { videoList, currentIndex } = useSelector(
    (state: RootState) => state.playback,
  );
  const [videoUrl, setVideoUrl] = useState('');
  const playing = useSelector((state: RootState) => state.playback.playing);
  // const videoUrl = `https://www.youtube.com/watch?v=${selectedVideoId}`;
  const currentVideoId = videoList[currentIndex]?.id.videoId;
  const currentVideo = `https://www.youtube.com/watch?v=${currentVideoId}`;
  const handleProgress = (state: any) => {
    const { played, playedSeconds } = state;
    setProgress(played * 100);
    setPlayedSeconds(playedSeconds);
    dispatch(setCurrentPlaybackTime(state.playedSeconds));
  };

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

  useEffect(() => {
    // currentIndex에 해당하는 비디오의 URL로 업데이트
    const currentVideoId = videoList[currentIndex]?.id.videoId;
    if (currentVideoId) {
      setVideoUrl(`https://www.youtube.com/watch?v=${currentVideoId}`);
    }

    // selectedVideoId에 해당하는 videoList 배열 내의 인덱스 찾기 및 currentIndex 업데이트
    // 이 로직은 사용자가 비디오 항목을 직접 클릭했을 때만 실행됩니다.
    if (selectedVideoId) {
      const newIndex = videoList.findIndex(
        (video) => video.id.videoId === selectedVideoId,
      );
      if (newIndex !== -1) {
        dispatch(setCurrentIndex(newIndex));
      }
    }
  }, [currentIndex, videoList, dispatch]);
  return (
    <>
      <Accordion sx={{ backgroundColor: 'black' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography color="white">유튜브 영상보기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {selectedVideoId && (
              <ReactPlayer
                url={videoUrl}
                ref={playerRef}
                playing={playing}
                controls={true}
                onProgress={handleProgress}
                onSeek={setPlayedSeconds}
                onDuration={setDurationSeconds}
                progressInterval={1000}
                volume={volume}
              />
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Player
        playerRef={playerRef}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
        progress={progress}
        setProgress={setProgress}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        volume={volume}
        setVolume={setVolume}
      /> */}
    </>
  );
};

export default PlayerAccordion;
