import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setMessage } from "./message";

import Detect from "~/app/api/detect";

export const request = createAsyncThunk(
  "detect/request",
  async (imageBase64: string, thunkAPI) => {
    try {
      const response = await Detect.request(imageBase64)
      thunkAPI.dispatch(setMessage(response.message));
      return {
        detect: response.data
      };
    } catch (_error) {
      const error = _error as ApiResponse<Detection>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: DetectState = {};

const detectSlice = createSlice({
  name: "detect",
  initialState,
  reducers: {
    clear: () => {
      return {};
    }
  },
  extraReducers: (builder) => {
    // request
    builder.addCase(
      request.fulfilled,
      (state, action: PayloadAction<DetectState>) => {
        state.detect = action.payload.detect
      }
    );
    builder.addCase(request.rejected, (state) => {
      state.detect = undefined;
    });
  },
});

const { reducer, actions } = detectSlice;

export const { clear } = actions;
export default reducer;
