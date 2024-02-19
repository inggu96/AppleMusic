import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!Cookies.get('weply_access'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isLoggedIn = true;
    },
    logoutAction: (state) => {
      state.isLoggedIn = false;
      Cookies.remove('weply_access');
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
