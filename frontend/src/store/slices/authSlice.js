import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('fg_user') || 'null'),
  token: localStorage.getItem('fg_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('fg_user', JSON.stringify(action.payload.user));
      localStorage.setItem('fg_token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('fg_user');
      localStorage.removeItem('fg_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
