import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer.js"
import authReducer from "./authSlice.js";
import canvasReducer from "./canvasSlice.js"
import { canvasMiddleware } from "./canvasMiddleware.js";
export const store = configureStore({
  reducer: {  auth: authReducer , profile: profileReducer, canvas: canvasReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['canvas/setSelectedObject'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.fabric', 'payload.canvas'],
        // Ignore these paths in the state
        ignoredPaths: ['canvas.selectedObject'],
      },
    }).concat(canvasMiddleware),
});
