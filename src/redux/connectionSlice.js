import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  initialState: null,
  name: "connections",

  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
  },
});

export default connectionSlice.reducer;
export const { addConnections, removeConnection } = connectionSlice.actions;
