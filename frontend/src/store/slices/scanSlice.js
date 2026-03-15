import { createSlice } from '@reduxjs/toolkit';

const scanSlice = createSlice({
  name: 'scan',
  initialState: {
    latestResult: null,
    history: [],
  },
  reducers: {
    setLatestResult: (state, action) => {
      state.latestResult = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setLatestResult, setHistory } = scanSlice.actions;
export default scanSlice.reducer;
