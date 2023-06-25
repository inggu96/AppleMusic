import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AppleIcon from '@mui/icons-material/Apple';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../../state/VideoActions';

import { logout } from '../../../state/VideoActions';

const searchStyle = makeStyles({
  root: {
    width: '220px',
    height: '52px',
    padding: '40px',
  },
});
const buttonStyle = makeStyles({
  root: {
    display: 'flex',
    border: 'none!important',
    width: '220px',
    height: '35px',
    fontSize: '16px !important',
    color: '#1c1c1c !important',
    textAlign: 'left !important',
    '&:active': {
      color: '#000000 !important',
      backgroundColor: '#000000 !important',
    },
  },
  startIcon: {
    color: '#ff0000 !important',
  },
});

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Searchclasses = searchStyle();
  const Buttonclasses = buttonStyle();
  const [isActive, setIsActive] = useState(false);
  const searchValue = useSelector((state) => state.searchValue);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    dispatch(logout());
    navigate(`/`);
  };

  const handleClick = () => {
    setIsActive(true);
  };
  const handleSearch = () => {
    // fetchVideos 액션을 디스패치하여 searchValue를 전달
    dispatch(fetchVideos(searchValue));
  };

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
            value={searchValue}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className={styles.playWrap}>
        <div className={styles.playButton}>
          <Button
            backgroundColor={isActive ? '#000000' : '#ffffff'}
            className={`${Buttonclasses.root} ${isActive ? 'active' : ''}`}
            variant="outlined"
            startIcon={
              <PlayCircleOutlineIcon className={Buttonclasses.startIcon} />
            }
            onClick={handleClick}
            active={isActive}
          >
            지금 듣기
          </Button>
        </div>
      </div>
      <div onClick={handleLogout}>로그아웃</div>
    </aside>
  );
};

export default Sidebar;
