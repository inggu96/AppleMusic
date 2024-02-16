import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
// import Controls from './Controls';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos, setDisplayMusic } from '../../../state/VideoActions';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import {
  SidebarContainer,
  SidebarWrapper,
  SidebarToggler,
} from './SidebarStyles';
import { ArrowBackIcon, ArrowIcon } from '../../../components/Common/Icons';
import { ExpandMoreIcon } from '../../../components/Common/Icons';

const Music = () => {
  const playerRef = useRef();
  const dispatch = useDispatch();
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
  const displayMusic = useSelector((state) => state.videos.displayMusic);

  const handleSidebarDisplay = () => {
    dispatch(setDisplayMusic(!displayMusic));
  };
  const togglePlayer = () => {
    setPlayerVisible(!isPlayerVisible);
  };

  useEffect(() => {
    dispatch(searchVideos());
  }, []);

  return (
    <SidebarContainer displayMusic={displayMusic}>
      <SidebarWrapper>
        <SidebarToggler
          displayMusic={displayMusic}
          onClick={handleSidebarDisplay}
        >
          {displayMusic ? (
            <ArrowIcon displayMusic={displayMusic} />
          ) : (
            <ArrowBackIcon displayMusic={displayMusic} />
          )}
        </SidebarToggler>
        {/* <Controls
          playerRef={playerRef}
          playedSeconds={playedSeconds}
          duration={durationSeconds}
          progress={progress}
          setProgress={setProgress}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          volume={volume}
          setVolume={setVolume}
          displayMusic={displayMusic}
        /> */}
        <Accordion
          expanded={isPlayerVisible}
          onChange={togglePlayer}
          sx={{ position: 'fixed', bottom: '990px', right: '120px' }}
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
  );
};

export default Music;
