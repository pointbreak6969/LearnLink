import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer.js";
import authReducer from "./authSlice.js";
import toolReducer from "./toolsSlice.js";
import canvasReducer from "./canvasSlice.js";
import historyReducer from "./historySlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tools: toolReducer,
    canvas: canvasReducer,
    history: historyReducer,
  },
});
