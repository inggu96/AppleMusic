// import React, { useEffect, useState } from 'react';
// import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { pause, play } from '../../../../state/VideoActions';
// import {
//   FastForwardIcon,
//   FastRewindIcon,
//   PauseIcon,
//   PlayArrowIcon,
// } from '../../../../components/Common/Icons';

// import {
//   ButtonWrap,
//   ControlContainer,
//   ControlFullTime,
//   ControlPrevTime,
//   ControlWrap,
//   FastButton,
//   ImageWrap,
//   Overlay,
//   PlayButton,
//   PlayWrap,
//   RevertButton,
//   TimeBar,
//   TimeBarWrap,
//   TitleCaption,
//   TitleChannel,
//   TitleImage,
//   TitleWrap,
// } from './ControlsStyles';

// const Controls = ({
//   playerRef,
//   playedSeconds,
//   duration,
//   setProgress,
//   currentTime,
//   setCurrentTime,
//   volume,
//   setVolume,
// }) => {
//   const dispatch = useDispatch();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [previousVolume, setPreviousVolume] = useState(0.5);
//   const [seekValue, setSeekValue] = useState(playedSeconds);
//   const playing = useSelector((state) => state.videos.playing);
//   const selectedVideoUrl = useSelector(
//     (state) => state.videos.selectedVideoUrl,
//   );
//   const selectedTitle = useSelector((state) => state.videos.selectedTitle);
//   const selectedChannelTitle = useSelector(
//     (state) => state.videos.selectedChannelTitle,
//   );
//   const handleVolumeToggle = () => {
//     if (volume === 0) {
//       setVolume(previousVolume);
//     } else {
//       setPreviousVolume(volume);
//       setVolume(0);
//     }
//   };
//   const handlePlayPauseClick = () => {
//     if (playing) {
//       dispatch(pause());
//       playerRef.current?.pause();
//     } else {
//       dispatch(play());
//       playerRef.current?.play();
//     }
//   };
//   const handleNextVideo = () => {
//     if (currentIndex < videos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };
//   const fastForward = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
//   };

//   const revert = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
//   };

//   const handleSeekChange = (event) => {
//     const { value } = event.target;
//     setSeekValue(parseFloat(value));
//   };

//   useEffect(() => {
//     const updateSeekValue = () => {
//       setSeekValue(playedSeconds);
//     };

//     updateSeekValue();
//   }, [playedSeconds]);
//   const formatTime = (value) => {
//     const minutes = Math.floor(value / 60);
//     const seconds = Math.floor(value % 60);
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
//       2,
//       '0',
//     )}`;
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(playerRef.current.getCurrentTime());
//       setProgress((playerRef.current.getCurrentTime() / duration) * 100);
//     }, 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <ControlContainer
//         style={{
//           background: `url(${selectedVideoUrl}) no-repeat center / cover `,
//         }}
//       >
//         <Overlay />
//         <ControlWrap>
//           <ImageWrap>
//             <TitleImage
//               playing={playing}
//               src={selectedVideoUrl || null}
//               alt={selectedVideoUrl ? 'Thumbnail' : null}
//             />
//           </ImageWrap>
//           <TitleWrap>
//             <TitleCaption>{selectedTitle}</TitleCaption>
//             <TitleChannel>{selectedChannelTitle}</TitleChannel>
//           </TitleWrap>

//           <TimeBarWrap>
//             <ControlPrevTime>{formatTime(currentTime)}</ControlPrevTime>
//             <TimeBar
//               type="range"
//               max={duration}
//               min={0}
//               color="gray"
//               step={1}
//               value={seekValue}
//               onChange={handleSeekChange}
//               onMouseUp={() => {
//                 playerRef.current.seekTo(seekValue);
//               }}
//               onTouchEnd={() => {
//                 playerRef.current.seekTo(seekValue);
//               }}
//             />
//             <ControlFullTime>{formatTime(duration)}</ControlFullTime>
//           </TimeBarWrap>
//           <ButtonWrap>
//             <RevertButton>
//               <FastRewindIcon />
//             </RevertButton>
//             <PlayWrap>
//               <PlayButton onClick={handlePlayPauseClick}>
//                 {playing ? (
//                   <PauseIcon sx={{ fontSize: 40 }} />
//                 ) : (
//                   <PlayArrowIcon sx={{ fontSize: 40 }} />
//                 )}
//               </PlayButton>
//             </PlayWrap>
//             <FastButton>
//               <FastForwardIcon />
//             </FastButton>
//           </ButtonWrap>
//           <ControlPrevTime />
//           <ControlFullTime />
//         </ControlWrap>
//       </ControlContainer>
//     </div>
//   );
// };

// export default Controls;
