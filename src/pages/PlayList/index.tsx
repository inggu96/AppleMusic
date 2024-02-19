import { getPlayList } from '@/api/hooks/getPlayList';
import { getPlaylistItems } from '@/api/hooks/getPlaylistItems';
import Layout from '@/components/Layout';
import { Box, Button, Chip, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface VideoItem {
  id: string;
  snippet: {
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

  if (isLoading) return <Layout>Loading...</Layout>;
  if (isError) return <Layout>Error: {isError}</Layout>;

  const handlePlaylistClick = async (playlistId: string) => {
    const items = await getPlaylistItems(playlistId);
    setVideos(items);
    console.log('items', items);
  };

  return (
    <Layout>
      <PlayRoot>
        <Typography color="common.white" variant="h5">
          유튜브 플레이리스트
        </Typography>
        {playlists && playlists.length > 0 ? (
          <Box className="list-box">
            {playlists.map((playlist: any, index: any) => (
              <>
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
                  color="primary"
                />
                <li
                  key={index}
                  onClick={() => handlePlaylistClick(playlist.id)}
                ></li>
              </>
            ))}
          </Box>
        ) : (
          <p>플레이리스트가 없습니다.</p>
        )}
        <div>
          {videos.length > 0 ? (
            <ul>
              {videos.map((video, index) => (
                <li key={index}>{video.snippet.title}</li>
              ))}
            </ul>
          ) : (
            <p>영상이 없습니다.</p>
          )}
        </div>
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
