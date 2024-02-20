import Cookies from 'js-cookie';
import { authedAxios } from '../base/axisoInstance';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const createPlaylist = async (
  playlistTitle: any,
  playlistDescription: any,
) => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.log('Access token is not found');
    return;
  }

  try {
    const response = await authedAxios.post(
      `${youtubeURL}/playlists`,
      {
        snippet: {
          title: playlistTitle,
          description: playlistDescription,
        },
        status: {
          privacyStatus: 'public',
        },
      },
      {
        params: {
          part: 'snippet,status',
          key: youtubeKey,
        },
      },
    );

    console.log('Playlist created successfully');
    return response.data;
  } catch (error) {
    console.error('Error creating playlist:', error);
    return null;
  }
};
