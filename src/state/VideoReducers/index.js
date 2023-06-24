import {
  FETCH_VIDEO_FAILURE,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  LOGIN,
  LOGOUT,
  PLAY,
  PAUSE,
} from '../VideoActions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  selectedVideoUrl: '',
  isLoggedIn: false,
  playing: false,
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
    case 'SET_SELECTED_VIDEO_URL':
      return {
        ...state,
        selectedVideoUrl: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case PLAY:
      return {
        ...state,
        playing: true,
      };
    case PAUSE:
      return {
        ...state,
        playing: false,
      };

    default:
      return state;
  }
};

export default videoReducer;
