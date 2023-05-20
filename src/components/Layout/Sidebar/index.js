import { symbol } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import AppleIcon from '@mui/icons-material/Apple';

const searchStyle = makeStyles({
  root: {
    width: '220px',
    height: '52px',
    padding: '40px',
  },
});
const buttonStyle = makeStyles({
  root: {
    width: '220px',
    height: '35px',
  },
});

const Sidebar = () => {
  const Searchclasses = searchStyle();
  const Buttonclasses = buttonStyle();
  return (
    <aside className={styles.sidebarWrap}>
      <Link to="/">
        <div className={styles.logo}>
          <AppleIcon />
          Music
        </div>
      </Link>
      <div className={styles.search}>
        <form>
          <TextField
            className={Searchclasses.root}
            id="outlined-basic"
            label="search"
            variant="outlined"
          />
        </form>
      </div>
      <div className={styles.playWrap}>
        <div className={styles.playButton}>
          <Button
            className={Buttonclasses.root}
            variant="outlined"
            startIcon={<SlideshowOutlinedIcon />}
          >
            전체보기
          </Button>
        </div>
        <div></div>
      </div>
    </aside>
  );
};

export default Sidebar;
