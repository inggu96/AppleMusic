import { deletePlaylistItem } from '@/api/hooks/deletePlaylistItem';
import { getPlayList } from '@/api/hooks/getPlayList';
import { getPlaylistItems } from '@/api/hooks/getPlaylistItems';
import Layout from '@/components/Layout';
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
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
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { createPlaylist } from '@/api/hooks/createPlaylist';
import useModal from '@/utils/useModal';
import { AddModal } from './AddModal';
interface VideoItem {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    title: string;
  };
}

const PlayList = () => {
  const {
    data: playlists,
    isError,
    isLoading,
    error,
  } = useQuery(['playlists'], getPlayList);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isModalOpen, openModal, closeModal } = useModal();

  if (isLoading) return <Layout>Loading...</Layout>;
  if (isError) return <Layout>Error: {isError}</Layout>;

  const handlePlaylistClick = async (playlistId: string) => {
    const items = await getPlaylistItems(playlistId);
    setVideos(items);
    console.log('items', items);
    console.log('videos', videos);
  };
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
  const handleDelete = async (playlistItemId: string) => {
    await deletePlaylistItem(playlistItemId);
    setVideos(videos.filter((video) => video.id !== playlistItemId));
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Layout>
      <AddModal open={isModalOpen} onClose={closeModal} />
      <PlayRoot>
        <Typography color="common.white" variant="h5">
          유튜브 플레이리스트
        </Typography>

        {playlists && playlists.length > 0 ? (
          <>
            <Box className="list-box">
              <Chip
                label="추가하기"
                onClick={openModal}
                className="list-chip"
              />
              {playlists.map((playlist: any, index: any) => (
                <Box key={index}>
                  <Chip
                    className="list-chip"
                    avatar={
                      <img
                        className="list-img"
                        src={playlist.snippet.thumbnails.default.url}
                        alt="bio"
                      />
                    }
                    label={playlist.snippet.title}
                    onClick={() => handlePlaylistClick(playlist.id)}
                  />
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <p>플레이리스트가 없습니다.</p>
        )}
        <Paper>
          <TableRoot>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < videos.length
                      }
                      checked={
                        videos.length > 0 && selected.length === videos.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': '모든 항목 선택' }}
                    />
                  </TableCell>
                  <TableCell>썸네일</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {videos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((video) => {
                    const isItemSelected = isSelected(video.id);
                    return (
                      <TableRow
                        key={video.id}
                        hover
                        onClick={(event) => handleClick(event, video.id)}
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
                        <TableCell component="th" scope="row">
                          <img
                            src={video.snippet.thumbnails.default?.url}
                            alt="썸네일"
                            style={{ width: 50 }}
                          />
                        </TableCell>
                        <ActionTableCell>{video.snippet.title}</ActionTableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(video.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
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
      </PlayRoot>
    </Layout>
  );
};

export default PlayList;

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
