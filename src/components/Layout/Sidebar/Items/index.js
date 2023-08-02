import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
  Search,
  SearchBar,
} from '../SidebarToggle/SidebarStyles';

import { SidebarData } from '../Data';
import { SearchIcon } from '../../../Common/Icons';
import { useDispatch } from 'react-redux';
import { searchVideos } from '../../../../state/VideoActions';

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const finding = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchVideos(searchValue));
    setSearchValue('');
    navigate('/search');
  };

  return (
    <ItemsList>
      <Search displaySidebar={displaySidebar}>
        <form onSubmit={handleSubmit}>
          <SearchIcon
            onClick={handleSubmit}
            sx={{
              position: 'absolute',
              color: '#919191',
              fontSize: 'medium',
              margin: '10px',
              cursor: 'pointer',
            }}
          />
          <SearchBar
            type="text"
            id="search"
            placeholder="검색"
            value={searchValue}
            onChange={finding}
          />
        </form>
      </Search>
      {SidebarData.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? 'active' : ''}
        >
          <Link to={itemData.path}>
            <ItemWrapper
              className={
                itemData.id === activeItem || (activeItem === 0 && index === 0)
                  ? 'active'
                  : ''
              }
            >
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
