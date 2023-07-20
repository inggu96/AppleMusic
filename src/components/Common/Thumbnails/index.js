import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedVideoUrl,
  setSelectedThumbnailId,
  setSelectedTitle,
  setSelectedChannelTitle,
  play,
} from '../../../state/VideoActions';
import styles from './thumbnails.module.scss';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

export const Thumbnails = ({ thumbnails, id, title, channelTitle }) => {
  const dispatch = useDispatch();

  const handleThumbnailClick = (thumbnails, id, title, channelTitle) => {
    dispatch(play());
    dispatch(setSelectedVideoUrl(thumbnails));
    dispatch(setSelectedThumbnailId(id));
    dispatch(setSelectedTitle(title));
    dispatch(setSelectedChannelTitle(channelTitle));
  };

  return (
    <article
      className={styles.wrap}
      onClick={() => handleThumbnailClick(thumbnails, id, title, channelTitle)}
    >
      <img className={styles.postImage} src={thumbnails} alt={title} />
      <div className={styles.overlay}>
        <span className={styles.score}>
          <PlayCircleFilledWhiteIcon />
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </article>
  );
};
