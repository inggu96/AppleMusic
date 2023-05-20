import apiClient from '../apiClient';

export const searchVideos = async (query) => {
  try {
    const response = await apiClient.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResult: 10,
          q: query,
          order: 'relevance',
          key: 'AIzaSyB4dGTE7TllfIFr6p_hh6L2ix1NOub_Bo4',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
