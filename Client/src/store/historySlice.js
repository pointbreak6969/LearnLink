import { createSlice } from '@reduxjs/toolkit';



const initialHistoryState = {
  past: [], // Array of path arrays
  future: [],
  maxHistoryLength: 50
};

export const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    undo: (state, action) => {
      const { currentPaths } = action.payload;
      if (state.past.length > 0) {
        const newFuture = [currentPaths, ...state.future];
        const newPast = state.past.slice(0, -1);
        state.future = newFuture;
        state.past = newPast;
      }
    },
    redo: (state, action) => {
      const { currentPaths } = action.payload;
      if (state.future.length > 0) {
        const newPast = [...state.past, currentPaths];
        const newFuture = state.future.slice(1);
        state.past = newPast;
        state.future = newFuture;
      }
    },
    addToHistory: (state, action) => {
      state.past = [
        ...state.past,
        action.payload
      ].slice(-state.maxHistoryLength);
      state.future = []; // Clear redo stack
    },
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    }
  }
});
export const {undo, redo, addToHistory, clearHistory} = historySlice.actions;
export default historySlice.reducer;