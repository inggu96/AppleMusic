import axios from 'axios';

export const plainAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  withCredentials: true,
});
import Cookies from 'js-cookie';

export const authedAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('weply_access')}`,
  },
});
