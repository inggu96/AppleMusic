import Cookies from 'js-cookie';
import { authedAxios } from '../base/axisoInstance';

const youtubeURL = process.env.REACT_APP_API_URL;

export const deletePlaylistItem = async (playlistItemId: string) => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.log('Access token is not found');
    return;
  }

  try {
    const response = await authedAxios.delete('/playlistItems', {
      baseURL: youtubeURL,
      params: {
        id: playlistItemId,
      },
    });

    console.log('Playlist item deleted successfully');
    return response.data;
  } catch (error) {
    console.error('Error deleting playlist item:', error);
  }
};
