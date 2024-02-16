import axios from 'axios';

export const authedAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  withCredentials: true,
});

export const plainAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  withCredentials: true,
});
