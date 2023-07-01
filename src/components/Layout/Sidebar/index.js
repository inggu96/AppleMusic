import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.scss';

import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppleIcon from '@mui/icons-material/Apple';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../../state/VideoActions';

import { logout } from '../../../state/VideoActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <SearchOutlinedIcon
            sx={{
              position: 'absolute',
              color: '#919191',
              fontSize: 'medium',
              margin: '10px',
            }}
          />
          <input
            type="text"
            id="search"
            placeholder="검색"
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
            <li>
              <PlayCircleOutlineIcon
                sx={{ color: '#d60017', fontSize: 'large' }}
              />
              둘러보기
            </li>
          </ul>
        </div>
      </div>
      <div onClick={handleLogout}>로그아웃</div>
    </aside>
  );
};

export default Sidebar;
