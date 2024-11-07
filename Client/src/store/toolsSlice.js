import { createSlice } from "@reduxjs/toolkit";
const initialToolState = {
  currentTool: "pencil",
  toolSettings: {
    pencil: { width: 2 },
    rectangle: { width: 2 },
    circle: { width: 2 },
    eraser: { width: 10 },
  },
};
 const toolsSlice = createSlice({
  name: "tools",
  initialState: initialToolState,
  reducers: {
    setCurrentTool: (state, action) => {
      state.currentTool = action.payload;
    },
    updateToolSetting: (state, action) => {
      const { tool, setting, value } = action.payload;
      state.toolSettings[tool] = {
        ...state.toolSettings[tool],
        [setting]: value,
      };
    },
  },
});
export const { setCurrentTool, updateToolSetting } = toolsSlice.actions;
export default toolsSlice.reducer;