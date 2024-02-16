import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../state/VideoActions';
import styles from './music.module.scss';

import { useNavigate } from 'react-router-dom';
import { Thumbnails } from '../../components/Common';
import { ExpandMoreIcon } from '../../components/Common/Icons';

const Music = () => {
  const navigate = useNavigate();
  const playerRef = useRef();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);
  const selectedThumbnailId = useSelector(
    (state) => state.videos.selectedThumbnailId,
  );

  const [progress, setProgress] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const playing = useSelector((state) => state.videos.playing);

  const togglePlayer = () => {
    setPlayerVisible(!isPlayerVisible);
  };

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const PleaseLogin = () => {
    alert('로그인을 해주세요');
    console.log(selectedThumbnailId);
  };

  if (loading) {
    return (
      <div className={styles.error}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className={styles.youtubeWrap}>
      <p>플레이리스트</p>
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
            url={`https://www.youtube.com/watch?v=${selectedThumbnailId}`}
            onProgress={(e) => {
              const { played, playedSeconds } = e;
              setProgress(played * 100);
              setPlayedSeconds(playedSeconds);
            }}
            onSeek={setPlayedSeconds}
            onDuration={setDurationSeconds}
            progressInterval={1000}
            volume={volume}
            playing={playing}
          />
        </AccordionDetails>
      </Accordion>
      <div className={styles.youtubeContent}>
        <ul className={styles.youtubeList}>
          {videos.map((video, idx) => (
            <li key={video.id} className={styles.youtubeItem}>
              <Thumbnails
                id={video.idx}
                thumbnails={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                channelTitle={video.snippet.channelTitle}
                idx={idx}
              />
              <div className={styles.controlsTitle}>
                <p className={styles.ranking}> {idx + 1} </p>
                <p className={styles.rankingChange}> - </p>
                <p className={styles.controlsTitleItem}>
                  {video.snippet.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Music;
