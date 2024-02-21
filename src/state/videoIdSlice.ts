import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  selectedVideoId: string;
  currentPlaybackTime: number;
}

const initialState: VideoState = {
  selectedVideoId: '',
  currentPlaybackTime: 0,
};

export const videoIdSlice = createSlice({
  name: 'videoId',
  initialState,
  reducers: {
    setSelectedVideoId: (state, action) => {
      state.selectedVideoId = action.payload;
    },
    setCurrentPlaybackTime: (state, action: PayloadAction<number>) => {
      // 액션 추가
      state.currentPlaybackTime = action.payload;
    },
  },
});

export const { setSelectedVideoId, setCurrentPlaybackTime } =
  videoIdSlice.actions;

export default videoIdSlice.reducer;
