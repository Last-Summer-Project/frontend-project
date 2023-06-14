import { createSlice } from "@reduxjs/toolkit";
import { DISABLED_HEAVY_SERVER_WORK } from "~/const/shared";

const initialState: FlagState = {
  disableHeavyServerWork: DISABLED_HEAVY_SERVER_WORK,
};

const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
      return state;
    },
    toggleHeavyServerWork: (state) => {
      state.disableHeavyServerWork = !state.disableHeavyServerWork;
      return state;
    },
  },
});

const { reducer, actions } = flagSlice;

export const { reset, toggleHeavyServerWork } = actions;
export default reducer;
