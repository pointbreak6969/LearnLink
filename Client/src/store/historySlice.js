import { createSlice } from '@reduxjs/toolkit';

const MAX_HISTORY = 50; // Maximum number of steps to store

const initialHistoryState = {
  past: [],
  future: []
};

export const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    undo: (state) => {
      const previous = state.past[state.past.length - 1];
      if (previous) {
        state.past = state.past.slice(0, -1);
        state.future = [previous, ...state.future];
      }
    },
    redo: (state) => {
      const next = state.future[0];
      if (next) {
        state.future = state.future.slice(1);
        state.past = [...state.past, next];
      }
    },
    addToHistory: (state, action) => {
      state.past = [...state.past, action.payload].slice(-MAX_HISTORY);
      state.future = []; // Clear redo stack when new action is performed
    }
  }
});
export const {undo, redo, addToHistory} = historySlice.actions;
export default historySlice.reducer;