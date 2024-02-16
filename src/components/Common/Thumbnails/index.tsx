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
import { PlayCircleFilledWhiteIcon } from '../Icons';

const Thumbnails = ({ thumbnails, id, title, channelTitle }: any) => {
  // const dispatch = useDispatch();
  // const handleThumbnailClick = (thumbnails, id, title, channelTitle) => {
  //   dispatch(play());
  //   dispatch(displayOn());
  //   dispatch(setSelectedVideoUrl(thumbnails));
  //   dispatch(setSelectedThumbnailId(id));
  //   dispatch(setSelectedTitle(title));
  //   dispatch(setSelectedChannelTitle(channelTitle));
  // };

  return (
    <div></div>
    // <article className={styles.container}>
    //   <div className={styles.card}>
    //     <div
    //       className={styles.wrap}
    //       onClick={() =>
    //         handleThumbnailClick(thumbnails, id, title, channelTitle)
    //       }
    //     >
    //       <img className={styles.postImage} src={thumbnails} alt={title} />

    //       <div className={styles.overlay}>
    //         <span className={styles.score}>
    //           <PlayCircleFilledWhiteIcon />
    //         </span>
    //       </div>
    //       <p>{title}</p>
    //     </div>
    //   </div>
    // </article>
  );
};
export default Thumbnails;
