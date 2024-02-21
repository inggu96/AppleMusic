import axios from 'axios';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const getPopular = async () => {
  try {
    const response = await axios.get('/videos', {
      baseURL: youtubeURL,
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
        order: 'relevance',
        key: youtubeKey,
      },
    });
    return response.data.items ?? [];
  } catch (error) {}
};
