import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Paper,
  styled,
  Typography,
  Box,
  IconButton,
  MenuList,
  MenuItem,
  Menu,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { setSelectedVideoId } from '@/state/videoIdSlice';
import { addVideo } from '@/api/hooks/addVideo';
import { getPlayList } from '@/api/hooks/getPlayList';
import {
  setSelectedChannelTitle,
  setSelectedTitle,
} from '@/state/playbackSlice';

interface Video {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnails: string;
}

interface VideoProps {
  videos: Video[];
}

const ListTable = ({ videos }: VideoProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const {
    data: playlists,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery(['playlists'], getPlayList);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = videos.map((n) => n.videoId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    videoId: string,
    title: string,
    channelTitle: string,
  ) => {
    const selectedIndex = selected.indexOf(videoId);
    dispatch(setSelectedTitle(title));
    dispatch(setSelectedChannelTitle(title));
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, videoId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (videoId: string) => selected.indexOf(videoId) !== -1;
  const rowSelected = (videoId: string) => selected.includes(videoId);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePlaylistItemClick = (videoId: string, playlistId: string) => {
    addVideo(videoId, playlistId)
      .then(() => {
        console.log(`비디오가 플레이리스트에 추가되었습니다: ${playlistId}`);
        handleMenuClose(); // 메뉴 닫기
      })
      .catch((error) => {
        console.error('비디오 추가 중 오류 발생', error);
      });
  };
  const handleVideoSelect = (videoId: string) => {
    dispatch(setSelectedVideoId(videoId));
    setExpanded(true);
  };

  return (
    <Paper>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>썸네일</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>추가</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((video) => {
                const isItemSelected = isSelected(video.videoId);
                const isRowSelected = rowSelected(video.videoId);
                return (
                  <TableRow
                    key={video.videoId}
                    hover
                    onClick={(event) => {
                      handleVideoSelect(video.videoId);
                      handleClick(
                        event,
                        video.videoId,
                        video.title,
                        video.channelTitle,
                      );
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={video.thumbnails}
                        alt="썸네일"
                        style={{ width: 50 }}
                      />
                    </TableCell>
                    <ActionTableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>{video.title}</Typography>
                        <Typography variant="body2" style={{ color: 'gray' }}>
                          {video.channelTitle}
                        </Typography>
                      </Box>
                    </ActionTableCell>
                    <IconButton
                      onClick={(event) => {
                        handleMenuOpen(event);
                      }}
                    >
                      <AddCircleOutlineIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      {playlists.map((playlist: any, idx: any) => (
                        <MenuItem
                          key={idx}
                          onClick={() =>
                            handlePlaylistItemClick(video.videoId, playlist.id)
                          }
                        >
                          {playlist.snippet.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableRoot>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={videos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count}`
        }
        sx={{
          '.MuiToolbar-root': {
            backgroundColor: 'black',
            color: 'white',
            justifyContent: 'flex-start',
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-select': {
            display: 'none',
          },
          '.MuiTablePagination-displayedRows': {
            margin: 0,
          },
        }}
      />
    </Paper>
  );
};

export default ListTable;

const ActionTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 150,
  position: 'relative',
  '& span': {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  '&:hover span': {
    animation: 'slideIn 25s linear infinite',
  },
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
}));

const TableRoot = styled(TableContainer)({
  backgroundColor: 'black',
  '& .MuiTableCell-root': {
    borderColor: 'black',
    color: 'white',
  },
  '& .MuiCheckbox-root': {
    color: '#161617',
  },
});
