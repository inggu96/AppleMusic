import React from 'react';
import AudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';

const AudioPlayerComponent = () => {
  return (
    <AudioPlayer
      src={'https://www.youtube.com/watch?v=6WZ67f9M3RE'}
      autoPlay={true}
      controls={true}
      style={{ width: '100%' }}
    />
  );
};

export default AudioPlayerComponent;
