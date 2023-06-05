import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setMessage } from "./message";

import Timelapse from "~/app/api/timelapse";

const UNIX_DATE_START = "1970-01-01T00:00:00.000Z"

const emptyResponse: TimelapseResponseRaw = {
  id: 0,
  deviceId: 0,
  status: "NOT_STARTED",
  logStartDate: UNIX_DATE_START,
  logEndDate: UNIX_DATE_START,
  lastUpdated: UNIX_DATE_START
};

const errorResponse: TimelapseResponseRaw = {
  id: -1,
  deviceId: -1,
  status: "NOT_STARTED",
  logStartDate: UNIX_DATE_START,
  logEndDate: UNIX_DATE_START,
  lastUpdated: UNIX_DATE_START
};

export const latest = createAsyncThunk(
  "timelapse/latest",
  async (_, thunkAPI) => {
    try {
      const response = await Timelapse.latest();

      return {
        timelapse: response.data
      };
    } catch (_error) {
      const error = _error as ApiResponse<LogResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const all = createAsyncThunk("timelapse/all", async (_, thunkAPI) => {
  try {
    const response = await Timelapse.all();

    return {
      list: response.data
    };
  } catch (_error) {
    const error = _error as ApiResponse<LogResponse>;
    const message = error.message || error.status || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(error);
  }
});

export const request = createAsyncThunk(
  "timelapse/request",
  async (props: TimelapseRequest, thunkAPI) => {
    try {
      const response = await Timelapse.request(props);

      return {
        timelapse: response.data
      };
    } catch (_error) {
      const error = _error as ApiResponse<LogResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: TimelapseState = { timelapse: emptyResponse, list: [] };

const timelapseSlice = createSlice({
  name: "timelapse",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Latest
    builder.addCase(
      latest.fulfilled,
      (state, action: PayloadAction<TimelapseState>) => {
        state.timelapse = action.payload.timelapse;
      }
    );
    builder.addCase(latest.rejected, state => {
      state.timelapse = errorResponse;
    });

    // Latest Detected
    builder.addCase(
      all.fulfilled,
      (state, action: PayloadAction<TimelapseState>) => {
        state.list = action.payload.list;
      }
    );
    builder.addCase(all.rejected, state => {
      state.list = [];
    });

    // detected per day
    builder.addCase(
      request.fulfilled,
      (state, action: PayloadAction<TimelapseState>) => {
        state.timelapse = action.payload.timelapse;
      }
    );
    builder.addCase(request.rejected, state => {
      state.timelapse = errorResponse;
    });
  }
});

const { reducer } = timelapseSlice;
export default reducer;
