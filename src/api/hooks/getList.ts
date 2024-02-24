import axios from 'axios';
import { SearchResult } from '@/types/Video';

const youtubeURL = process.env.REACT_APP_API_URL;
const youtubeKey = process.env.REACT_APP_API_KEY;

export const getList = async (category: string): Promise<SearchResult[]> => {
  try {
    const { data } = await axios.get('/search', {
      baseURL: youtubeURL,
      params: {
        part: 'snippet',
        q: category,
        maxResults: 10,
        order: 'relevance',
        key: youtubeKey,
      },
    });
    return data.items ?? [];
  } catch (error) {
    return [];
  }
};
