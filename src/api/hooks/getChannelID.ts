import axios from 'axios';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const getChannelId = async (
  username: string,
): Promise<string | null> => {
  try {
    const response = await axios.get('/channels', {
      baseURL: youtubeURL,
      params: {
        part: 'id',
        forUsername: username,
        key: youtubeKey,
      },
    });
    const channelId = response.data.items[0]?.id ?? null;
    return channelId;
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    return null;
  }
};
