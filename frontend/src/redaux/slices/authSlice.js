// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../actions/action';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload.data?.token;
        const user = action.payload.data?.user;

        if (token) {
          state.accessToken = token;
          state.user = user;
          state.isAuthenticated = true;

          // store securely
          localStorage.setItem('accessToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
          localStorage.setItem('tokenExpiry', expiryTime);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
