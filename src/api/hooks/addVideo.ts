import Cookies from 'js-cookie';
import { authedAxios } from '../base/axisoInstance';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const addVideo = async (videoId: string, playlistId: string) => {
  const accessToken = Cookies.get('weply_access');
  if (!accessToken) {
    console.error('Access token is not found');
    return;
  }

  try {
    const response = await authedAxios.post(
      `${youtubeURL}/playlistItems`,
      {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId: videoId,
          },
        },
      },
      {
        params: {
          part: 'snippet',
        },
      },
    );

    console.log('비디오 추가성공');
    return response.data;
  } catch (error) {
    console.error('비디오 추가실패:', error);
    return null;
  }
};
