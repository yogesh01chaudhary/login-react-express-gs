import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
};
export const authSlice = createSlice({
  name: "auth_info",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload.token;
    },
    unSetUserToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setUserToken, unSetUserToken } = authSlice.actions;
export default authSlice.reducer;
