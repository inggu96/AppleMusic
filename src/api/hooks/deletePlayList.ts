import Cookies from 'js-cookie';
import { authedAxios } from '../base/axisoInstance';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const deletePlaylist = async (playlistId: string) => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.error('Access token is not found');
    return;
  }

  try {
    const response = await authedAxios.delete(`/playlists`, {
      baseURL: youtubeURL,
      params: {
        id: playlistId,
        key: youtubeKey,
      },
    });

    console.log('삭제완료');
    return response.data;
  } catch (error) {
    console.error('삭제 중 에러발생:', error);
    return null;
  }
};
