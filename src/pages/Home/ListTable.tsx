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
} from '@mui/material';

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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = videos.map((n) => n.videoId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, videoId: string) => {
    const selectedIndex = selected.indexOf(videoId);
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

  useEffect(() => {
    console.log('videos', videos);
  });

  return (
    <Paper>
      <TableContainer>
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
              <TableCell>채널 이름</TableCell>
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
                    onClick={(event) => handleClick(event, video.videoId)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={video.thumbnails}
                        alt="썸네일"
                        style={{ width: 50 }}
                      />
                    </TableCell>
                    <ActionTableCell>
                      {' '}
                      <span>{video.title}</span>
                    </ActionTableCell>
                    <TableCell>{video.channelTitle}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={videos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
