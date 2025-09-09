import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
