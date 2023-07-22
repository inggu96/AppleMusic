import {
  FETCH_VIDEO_FAILURE,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  LOGIN,
  LOGOUT,
  PLAY,
  PAUSE,
  SET_USER_DATA,
  SET_IS_LOGGED_IN,
  SET_FIND_DATA,
  SET_SELECTED_VIDEO_URL,
  SET_SELECTED_THUMBNAILID,
  SET_SELECTED_TITLE,
  SET_SELECTED_CHANNEL_TITLE,
} from '../VideoActions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  isLoggedIn: false,
  userData: null,
  findData: '',
  playing: false,
  selectedVideoUrl: '',
  selectedThumbnailId: null,
  selectedTitle: null,
  selectedChannelTitle: null,
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
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_FIND_DATA:
      return {
        ...state,
        findData: action.payload,
      };
    case SET_SELECTED_VIDEO_URL:
      return {
        ...state,
        selectedVideoUrl: action.payload,
      };
    case SET_SELECTED_THUMBNAILID:
      return {
        ...state,
        selectedThumbnailId: action.payload,
      };
    case SET_SELECTED_TITLE:
      return {
        ...state,
        selectedTitle: action.payload,
      };
    case SET_SELECTED_CHANNEL_TITLE:
      return {
        ...state,
        selectedChannelTitle: action.payload,
      };

    default:
      return state;
  }
};

export default videoReducer;
