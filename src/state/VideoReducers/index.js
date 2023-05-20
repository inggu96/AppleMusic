import {
  FETCH_VIDEO_FAILURE,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
} from '../VideoActions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case FETCH_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
