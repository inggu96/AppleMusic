import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef();

  return (
    <div>
      <ReactPlayer
        controls={false}
        playing={playing}
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ref={playerRef}
        onProgress={(e) => {
          const { played, playedSeconds } = e;
          setProgress(played * 100);
          setPlayedSeconds(playedSeconds);
        }}
        onSeek={setPlayedSeconds}
        onDuration={setDurationSeconds}
        progressInterval={1000}
      />
      <Controls
        playerRef={playerRef}
        playing={playing}
        setPlaying={setPlaying}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
        progress={progress}
        setProgress={setProgress}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
};

export default Player;
