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
  CircularProgress,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Thumbnails } from '../../components/Common';
import { ExpandMoreIcon, PlaylistAddIcon } from '../../components/Common/Icons';

const PlayListAddStyle = makeStyles({
  root: {
    width: '50px',
    height: '52px',
    fontSize: '30px',
    cursor: 'pointer',
  },
});

const Music = () => {
  const navigate = useNavigate();
  const PlayListAddclasses = PlayListAddStyle();
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
    dispatch(searchVideos());
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

      <div className={styles.youtubeContent}>
        <ul className={styles.youtubeList}>
          {videos.map((video, idx) => (
            <li key={video.id} className={styles.youtubeItem}>
              <Thumbnails
                id={video.id.videoId}
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
      />
    </div>
  );
};

export default Music;
