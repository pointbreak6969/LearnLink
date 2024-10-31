import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer.js"
import authReducer from "./authSlice.js";
export const store = configureStore({
  reducer: {  auth: authReducer , profile: profileReducer },
});
