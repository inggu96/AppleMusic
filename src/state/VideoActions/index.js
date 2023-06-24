import axios from 'axios';

export const FETCH_VIDEO_REQUEST = 'FETCH_VIDEO_REQUEST';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';

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

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const play = () => ({
  type: PLAY,
});
export const pause = () => ({
  type: PAUSE,
});

export const fetchVideos = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=music&order=relevance&key=AIzaSyDPm1djuUOZKFIad32z0rfR8EVwCXn0pCA',
      );

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
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=잔나비&order=relevance&key=AIzaSyB4dGTE7TllfIFr6p_hh6L2ix1NOub_Bo4',
      );

      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};
