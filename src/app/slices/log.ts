import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setMessage } from "./message";

import DeviceLog from "~/app/api/log";

const emptyResponse: LogResponseRaw = {
  deviceId: -1,
  humidity: -1,
  temperature: -1,
  imageUrl: "",
  detection: {
    status: "NOT_STARTED"
  },
  timestamp: '1970-01-01T00:00:00.000Z'
};

export const latest = createAsyncThunk("log/latest", async (_, thunkAPI) => {
  try {
    const response = await DeviceLog.latest();

    return {
      log: response.data
    };
  } catch (_error) {
    const error = _error as ApiResponse<LogResponse>;
    const message = error.message || error.status || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(error);
  }
});

export const latestDetected = createAsyncThunk(
  "log/latest_detected",
  async (_, thunkAPI) => {
    try {
      const response = await DeviceLog.latest_detected();

      return {
        log: response.data
      };
    } catch (_error) {
      const error = _error as ApiResponse<LogResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const detectedPerDay = createAsyncThunk(
  "log/detected_per_day",
  async (_, thunkAPI) => {
    try {
      const response = await DeviceLog.detected_per_day();

      return {
        logs: response.data
      };
    } catch (_error) {
      const error = _error as ApiResponse<LogResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: LogState = { log: emptyResponse, logs: [] };

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Latest
    builder.addCase(
      latest.fulfilled,
      (state, action: PayloadAction<LogState>) => {
        state.log = action.payload.log;
      }
    );
    builder.addCase(latest.rejected, state => {
      state.log = emptyResponse;
    });

    // Latest Detected
    builder.addCase(
      latestDetected.fulfilled,
      (state, action: PayloadAction<LogState>) => {
        state.log = action.payload.log;
      }
    );
    builder.addCase(latestDetected.rejected, state => {
      state.log = emptyResponse;
    });

    // detected per day
    builder.addCase(
      detectedPerDay.fulfilled,
      (state, action: PayloadAction<LogState>) => {
        state.logs = action.payload.logs;
      }
    );
    builder.addCase(detectedPerDay.rejected, state => {
      state.logs = [];
    });
  }
});

const { reducer } = logSlice;
export default reducer;
