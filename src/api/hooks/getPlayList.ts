import axios from 'axios';
import Cookies from 'js-cookie';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const getPlayList = async () => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.log('Access token is not found');
    return;
  }

  try {
    const response = await axios.get('/playlists', {
      baseURL: youtubeURL,
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data.items ?? [];
  } catch (error) {
    return [];
  }
};
