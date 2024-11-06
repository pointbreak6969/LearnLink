import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentColor: '#000000',
  currentStroke: '#000000',
  currentFill: 'transparent',
  objects: [],
  history: [],
  historyIndex: -1,
  isDrawing: false,
  selectedObject: null,
  activeTool: 'select',
  zoom: 1,
  pan: { x: 0, y: 0 },
  viewportTransform: [1, 0, 0, 1, 0, 0],
  canvasSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setObjects: (state, action) => {
      state.objects = action.payload;
      // Add to history
      state.history = [...state.history.slice(0, state.historyIndex + 1), action.payload];
      state.historyIndex += 1;
    },
    setActiveTool: (state, action) => {
      state.activeTool = action.payload;
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    setSelectedObject: (state, action) => {
      state.selectedObject = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setPan: (state, action) => {
      state.pan = action.payload;
    },
    setViewportTransform: (state, action) => {
      state.viewportTransform = action.payload;
    },
    updateCanvasSize: (state, action) => {
      state.canvasSize = action.payload;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.objects = state.history[state.historyIndex];
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.objects = state.history[state.historyIndex];
      }
    },
    deleteSelectedObject: (state) => {
      if (state.selectedObject) {
        state.objects = state.objects.filter(obj => obj.id !== state.selectedObject.id);
        state.selectedObject = null;
      }
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
      state.currentStroke = action.payload;
    },
    setCurrentFill: (state, action) => {
      state.currentFill = action.payload;
    },
  }
});

export const {
  setObjects,
  setActiveTool,
  setIsDrawing,
  setSelectedObject,
  setZoom,
  setPan,
  setViewportTransform,
  updateCanvasSize,
  undo,
  redo,
  deleteSelectedObject,
  setCurrentColor,
  setCurrentFill
} = canvasSlice.actions;

export default canvasSlice.reducer;