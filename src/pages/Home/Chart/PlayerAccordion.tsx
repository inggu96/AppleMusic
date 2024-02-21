import React from 'react';
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

const PlayerAccordion = () => {
  const dispatch = useDispatch();
  const selectedVideoId = useSelector(
    (state: RootState) => state.videoId.selectedVideoId,
  );
  const videoUrl = `https://www.youtube.com/watch?v=${selectedVideoId}`;
  const handleProgress = (state: any) => {
    dispatch(setCurrentPlaybackTime(state.playedSeconds));
  };

  return (
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
              playing
              controls
              onProgress={handleProgress}
            />
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlayerAccordion;
