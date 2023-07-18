import axios from 'axios';

import apiClient from '../../api/apiClient';

export const FETCH_VIDEO_REQUEST = 'FETCH_VIDEO_REQUEST';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_FIND_DATA = 'SET_FIND_DATA';

export const setSelectedVideoUrl = (url) => ({
  type: 'SET_SELECTED_VIDEO_URL',
  payload: url,
});

export const fetchVideosRequest = () => ({
  type: FETCH_VIDEO_REQUEST,
});

export const fetchVideosSuccess = (videos) => ({
  type: FETCH_VIDEO_SUCCESS,
  payload: videos,
});

export const fetchVideosFailure = (error) => ({
  type: FETCH_VIDEO_FAILURE,
  payload: error,
});

export const login = (userData) => {
  return {
    type: LOGIN,
    userData,
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const play = () => ({
  type: PLAY,
});
export const pause = () => ({
  type: PAUSE,
});

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};

export const findData = (data) => {
  return {
    type: SET_FIND_DATA,
    payload: data,
  };
};

export const fetchVideos = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await apiClient.get('/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          order: 'relevance',
          key: 'AIzaSyDHlg5D1rVtRcj2fasxXw91Y4JM2S_SiI8',
        },
      });

      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};

export const searchVideos = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          q: data,
          maxResults: 10,
          order: 'relevance',
          key: 'AIzaSyDHlg5D1rVtRcj2fasxXw91Y4JM2S_SiI8',
        },
      });
      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};
export const fetchList = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=잔나비&order=relevance',
      );

      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};
