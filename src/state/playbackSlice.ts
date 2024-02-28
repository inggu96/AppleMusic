import { createSlice } from '@reduxjs/toolkit';
interface VideoDetail {
  id: {
    videoId: string;
  };
  snippet: {
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    title: string;
  };
}

interface PlayState {
  playing: boolean;
  volume: number;
  playedSeconds: number;
  durationSeconds: number;
  selectedVideoUrl: string;
  selectedTitle: string;
  selectedChannelTitle: string;
  videoList: VideoDetail[];
  currentIndex: number;
}
const initialState: PlayState = {
  playing: true,
  volume: 1,
  playedSeconds: 0,
  durationSeconds: 0,
  selectedVideoUrl: '',
  selectedTitle: '',
  selectedChannelTitle: '',
  videoList: [],
  currentIndex: 0,
};

export const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setPlayedSeconds: (state, action) => {
      state.playedSeconds = action.payload;
    },
    setDurationSeconds: (state, action) => {
      state.durationSeconds = action.payload;
    },
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload;
    },
    setSelectedVideoUrl: (state, action) => {
      state.selectedVideoUrl = action.payload;
    },
    setSelectedChannelTitle: (state, action) => {
      state.selectedChannelTitle = action.payload;
    },
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const {
  togglePlay,
  setVolume,
  setPlayedSeconds,
  setDurationSeconds,
  setSelectedTitle,
  setSelectedChannelTitle,
  setVideoList,
  setCurrentIndex,
} = playbackSlice.actions;

export default playbackSlice.reducer;
