import axios from 'axios';

export const FETCH_VIDEO_REQUEST = 'FETCH_VIDEO_REQUEST';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const DISPLAYON = 'DISPLAYON';
export const DISPLAYOFF = 'DISPLAYOFF';
export const SET_DISPLAY_MUSIC = 'SET_DISPLAY_MUSIC';
export const SET_SELECTED_VIDEO_URL = 'SET_SELECTED_VIDEO_URL';
export const SET_SELECTED_THUMBNAILID = 'SET_SELECTED_THUMBNAILID';
export const SET_SELECTED_TITLE = 'SET_SELECTED_TITLE';
export const SET_SELECTED_CHANNEL_TITLE = 'SET_SELECTED_CHANNEL_TITLE';

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
export const play = () => ({
  type: PLAY,
});
export const pause = () => ({
  type: PAUSE,
});

export const setDisplayMusic = (value) => ({
  type: SET_DISPLAY_MUSIC,
  payload: value,
});

export const displayOn = () => ({
  type: DISPLAYON,
});
export const displayOff = () => ({
  type: DISPLAYOFF,
});

export const setSelectedVideoUrl = (videoUrl) => ({
  type: SET_SELECTED_VIDEO_URL,
  payload: videoUrl,
});

export const setSelectedThumbnailId = (thumbnailId) => {
  return {
    type: SET_SELECTED_THUMBNAILID,
    payload: thumbnailId,
  };
};

export const setSelectedTitle = (title) => {
  return {
    type: SET_SELECTED_TITLE,
    payload: title,
  };
};

export const setSelectedChannelTitle = (channelTitle) => {
  return {
    type: SET_SELECTED_CHANNEL_TITLE,
    payload: channelTitle,
  };
};

export const fetchVideos = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/videos?',
        {
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 20,
            order: 'relevance',
            key: 'AIzaSyDjW65U75KScD-nswCOF6gu8m_HklLQ6hw',
          },
        },
      );

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

      const response = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/search?',
        {
          params: {
            part: 'snippet',
            q: data,
            maxResults: 10,
            order: 'relevance',
            key: 'AIzaSyDjW65U75KScD-nswCOF6gu8m_HklLQ6hw',
          },
        },
      );
      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};

export const searchList = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());
      const response = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/search?',

        {
          params: {
            part: 'snippet',
            q: data,
            maxResults: 10,
            order: 'relevance',
            key: 'AIzaSyDjW65U75KScD-nswCOF6gu8m_HklLQ6hw',
          },
        },
      );
      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};
