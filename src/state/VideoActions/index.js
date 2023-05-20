import apiClient from '../../api/apiClient';

export const FETCH_VIDEO_REQUEST = 'FETCH_VIDEO_REQUEST';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';

export const FetchVideosRequest = () => ({
  type: FETCH_VIDEO_REQUEST,
});

export const FetchVideosSuccess = (videos) => ({
  type: FETCH_VIDEO_SUCCESS,
  payload: videos,
});

export const FetchVideosFailure = (error) => ({
  type: FETCH_VIDEO_FAILURE,
  payload: error,
});

export const fetchVideos = (query) => {
  return async (dispatch) => {
    try {
      dispatch(FetchVideosRequest());

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

      dispatch(FetchVideosSuccess(response.data.items));
    } catch (error) {
      dispatch(FetchVideosFailure(error));
    }
  };
};
