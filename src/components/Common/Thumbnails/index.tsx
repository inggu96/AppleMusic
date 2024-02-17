import { styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedVideoUrl,
  setSelectedThumbnailId,
  setSelectedTitle,
  setSelectedChannelTitle,
  play,
  displayOn,
} from '../../../state/VideoActions';

const Thumbnails = ({ thumbnails, id, title, channelTitle }: any) => {
  const dispatch = useDispatch();
  const handleThumbnailClick = (
    thumbnails: any,
    id: any,
    title: any,
    channelTitle: any,
  ) => {
    dispatch(play());
    dispatch(displayOn());
    dispatch(setSelectedVideoUrl(thumbnails));
    dispatch(setSelectedThumbnailId(id));
    dispatch(setSelectedTitle(title));
    dispatch(setSelectedChannelTitle(channelTitle));
  };

  return (
    <Container>
      <Card>
        <Wrap
          onClick={() =>
            handleThumbnailClick(thumbnails, id, title, channelTitle)
          }
        >
          <img src={thumbnails} alt={title} />

          <p>{title}</p>
        </Wrap>
      </Card>
    </Container>
  );
};
export default Thumbnails;

const colors = {
  white10: '#FFFFFF1A',
  black10: '#0000001A',
  primaryColor: '#FF5722',
};
const borderRadius = '8px';

const Container = styled('article')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  width: '220px',
  height: '220px',
  backgroundColor: colors.white10,
});

const Card = styled('div')({
  width: '220px',
  height: '180px',
  backgroundColor: '#111827',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  borderRadius: borderRadius,
});

const Wrap = styled('div')({
  width: '220px',
  height: '180px',
  position: 'relative',
  color: 'white',
  backgroundColor: colors.white10,
  borderRadius: borderRadius,
  overflow: 'hidden',
  transition: '0.2s transform ease-in',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.02) translateY(-10px)',
    '& > .overlay': {
      backgroundColor: colors.black10,
      visibility: 'visible',
    },
  },
});
