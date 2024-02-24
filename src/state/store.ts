import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoIdReducer from './videoIdSlice';
import playbackReducer from './playbackSlice';

export const store = configureStore({
  reducer: {
    videoId: videoIdReducer,
    auth: authReducer,
    playback: playbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
