import Cookies from 'js-cookie';
import { authedAxios } from '../base/axisoInstance';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const getPlayList = async () => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.log('Access token is not found');
    return;
  }

  try {
    const response = await authedAxios.get('/playlists', {
      baseURL: youtubeURL,
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
    });
    console.log(response.data);
    return response.data.items ?? [];
  } catch (error) {
    return [];
  }
};
