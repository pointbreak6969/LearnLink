import { createSlice } from '@reduxjs/toolkit';

const initialCanvasState = {
  paths: [], // Stores the actual drawing data
  currentPath: null,
  isDrawing: false,
  canvasSize: {
    width: 0,
    height: 0
  }
};

 const canvasSlice = createSlice({
  name: 'canvas',
  initialState: initialCanvasState,
  reducers: {
    startDrawing: (state, action) => {
      state.isDrawing = true;
      state.currentPath = {
        tool: action.payload.tool,
        settings: action.payload.settings,
        points: [action.payload.point]
      };
    },
    addPoint: (state, action) => {
      if (state.currentPath) {
        state.currentPath.points.push(action.payload);
      }
    },
    endDrawing: (state) => {
      if (state.currentPath) {
        state.paths.push(state.currentPath);
        state.currentPath = null;
      }
      state.isDrawing = false;
    },
    setCanvasSize: (state, action) => {
      state.canvasSize = action.payload;
    }
  }
});
export const { addPoint, startDrawing, endDrawing, setCanvasSize} = canvasSlice.actions;
export default canvasSlice.reducer;