import { addVideo } from '@/api/hooks/addVideo';
import { deletePlaylistItem } from '@/api/hooks/deletePlaylistItem';
import { getPlayList } from '@/api/hooks/getPlayList';
import { getPopular } from '@/api/hooks/getPopular';
import Layout from '@/components/Layout';
import { RootState } from '@/state/store';
import { setSelectedVideoId } from '@/state/videoIdSlice';
import { VideoItem } from '@/types/Video';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import PlayerAccordion from './PlayerAccordion';

const Chart = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const {
    data: popular,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery(['popular'], getPopular);

  const { data: playlists } = useQuery(['playlists'], getPlayList);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = videos.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

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
        handleMenuClose();
      })
      .catch((error) => {
        console.error('비디오 추가 중 오류 발생', error);
      });
  };

  const handleVideoSelect = (videoId: string) => {
    dispatch(setSelectedVideoId(videoId));
    setExpanded(true);
  };

  if (isLoading) return <Layout>Loading...</Layout>;
  if (isError) return <Layout>Error: {isError}</Layout>;

  return (
    <Layout>
      <Paper>
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < popular.length
                    }
                    checked={
                      popular.length > 0 && selected.length === popular.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': '모든 항목 선택' }}
                  />
                </TableCell>
                <StyledTableCell sx={{ width: '40px' }}>순위</StyledTableCell>
                <StyledTableCell>썸네일</StyledTableCell>
                <StyledTableCell>제목</StyledTableCell>
                <StyledTableCell>추가</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {popular
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((video: any, idx: number) => {
                  const isItemSelected = isSelected(video.id);
                  return (
                    <TableRow
                      key={video.id}
                      hover
                      onClick={(event) => {
                        handleVideoSelect(video.id);
                        handleClick(event, video.id);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          color={isItemSelected ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <StyledTableCell padding="checkbox">
                        <Typography>{idx + 1}</Typography>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={video.snippet.thumbnails.default?.url}
                          alt="썸네일"
                          style={{ width: 50 }}
                        />
                      </StyledTableCell>
                      <ActionTableCell>{video.snippet.title}</ActionTableCell>
                      <StyledTableCell>
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
                                handlePlaylistItemClick(
                                  video.videoId,
                                  playlist.id,
                                )
                              }
                            >
                              {playlist.snippet.title}
                            </MenuItem>
                          ))}
                        </Menu>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableRoot>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={playlists.length}
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
    </Layout>
  );
};

export default Chart;

const PlayRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  '.list-box': {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  '.list-chip': {
    color: '#fff',
    cursor: 'pointer',
    transition: 'filter 0.2s ease',
    backgroundColor: '#161617',
    '&:hover': {
      filter: 'brightness(50%)',
    },
  },
  '.list-img': {
    borderRadius: '50%',
  },
});

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
}));

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
