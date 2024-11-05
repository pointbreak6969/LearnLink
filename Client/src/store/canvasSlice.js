import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  objects: [],
  isDrawing: false,
  selectedObject: null,
  zoon: 1,
  pan: { x: 0, y: 0 },
  viewportTransform: [1, 0, 0, 1, 0, 0],
  canvasSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};
const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setObjects: (state, action) => {
      state.objects = action.payload;
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    setSeletedOjbect: (state, action) => {
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
  },
});
export const {
  setObjects,
  setIsDrawing,
  setSeletedOjbect,
  setZoom,
  setPan,
  setViewportTransform,
  updateCanvasSize,
} = canvasSlice.actions;
export default canvasSlice.reducer;
