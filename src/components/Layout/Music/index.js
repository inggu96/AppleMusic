import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import styles from './music.module.scss';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos } from '../../../state/VideoActions';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';

import {
  SidebarContainer,
  SidebarWrapper,
  SidebarToggler,
} from './SidebarStyles';
import { ArrowBackIcon, ArrowIcon } from '../../../components/Common/Icons';
import { useNavigate } from 'react-router-dom';
import { Thumbnails } from '../../../components/Common';
import {
  ExpandMoreIcon,
  PlaylistAddIcon,
} from '../../../components/Common/Icons';

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

  const MOBILE_VIEW = window.innerWidth < 468;

  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

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

  return (
    <div className={styles.youtubeWrap}>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarToggler
            displaySidebar={displaySidebar}
            onClick={handleSidebarDisplay}
          >
            {displaySidebar ? (
              <ArrowIcon displaySidebar={displaySidebar} />
            ) : (
              <ArrowBackIcon displaySidebar={displaySidebar} />
            )}
          </SidebarToggler>
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
          <Accordion
            expanded={isPlayerVisible}
            onChange={togglePlayer}
            sx={{ position: 'fixed', bottom: '40px', right: '120px' }}
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
        </SidebarWrapper>
      </SidebarContainer>
    </div>
  );
};

export default Music;
