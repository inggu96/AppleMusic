import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoIdReducer from './videoIdSlice';

export const store = configureStore({
  reducer: {
    videoId: videoIdReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
