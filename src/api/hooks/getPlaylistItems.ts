import axios from 'axios';
import Cookies from 'js-cookie';

export const getPlaylistItems = async (playlistId: any) => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.log('Access token is not found');
    return [];
  }

  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/playlistItems',
      {
        params: {
          part: 'snippet',
          playlistId: playlistId,
          maxResults: 50,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data.items ?? [];
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return [];
  }
};
