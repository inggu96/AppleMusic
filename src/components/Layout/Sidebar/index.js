import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.scss';

import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppleIcon from '@mui/icons-material/Apple';

import { useDispatch, useSelector } from 'react-redux';
import { searchVideos, logout, findData } from '../../../state/VideoActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const userData = useSelector((state) => state.userData);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    dispatch(logout());
    navigate(`/`);
  };

  const finding = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchVideos(searchValue));
    setSearchValue('');
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
        <form onSubmit={handleSubmit}>
          <SearchOutlinedIcon
            onClick={handleSubmit}
            sx={{
              position: 'absolute',
              color: '#919191',
              fontSize: 'medium',
              margin: '10px',
              cursor: 'pointer',
            }}
          />
          <input
            type="text"
            id="search"
            placeholder="검색"
            value={searchValue}
            onChange={finding}
            className={styles.searchBar}
          />
        </form>
      </div>
      <div className={styles.playWrap}>
        <div className={styles.playButton}>
          <ul>
            <li>
              <AutoAwesomeOutlinedIcon
                sx={{ color: '#d60017', fontSize: 'large' }}
              />
              인기검색어
            </li>
            <li>
              <QueueMusicRoundedIcon
                sx={{ color: '#d60017', fontSize: 'large' }}
              />
              플레이리스트
            </li>
            <li>
              <PlayCircleOutlineIcon
                sx={{ color: '#d60017', fontSize: 'large' }}
              />
              둘러보기
            </li>
            <li>{userData}</li>
          </ul>
        </div>
      </div>
      <div onClick={isLoggedIn ? handleLogout : '로그인'}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </div>
    </aside>
  );
};

export default Sidebar;
