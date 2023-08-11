import {
  FETCH_VIDEO_FAILURE,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  PLAY,
  PAUSE,
  SET_SELECTED_VIDEO_URL,
  SET_SELECTED_THUMBNAILID,
  SET_SELECTED_TITLE,
  SET_SELECTED_CHANNEL_TITLE,
  DISPLAYON,
  DISPLAYOFF,
  SET_DISPLAY_MUSIC,
} from '../VideoActions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  playing: false,
  selectedVideoUrl: '',
  selectedThumbnailId: null,
  selectedTitle: null,
  selectedChannelTitle: null,
  displayMusic: false,
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
    case SET_DISPLAY_MUSIC:
      return {
        ...state,
        displayMusic: action.payload,
      };
    case DISPLAYON:
      return {
        ...state,
        displayMusic: true,
      };
    case DISPLAYOFF:
      return {
        ...state,
        displayMusic: false,
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
