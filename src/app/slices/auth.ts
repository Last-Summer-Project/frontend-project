import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import AuthService from "../service/auth.service";
import { setMessage } from "./message";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "~/const/auth";
import { getTokenData } from "~/app/utils/token";

// Default null
const nullTokenStorage: TokenStorage = {
  access: null,
  refresh: null,
};

// Load data
const tokenStorage: TokenStorage = {
  access: sessionStorage.getItem(ACCESS_TOKEN_KEY),
  refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
};
const user = (() => {
  if (!tokenStorage.access) return null;
  return getTokenData(tokenStorage.access);
})();

export const login = createAsyncThunk(
  "auth/login",
  async ({ loginId, password }: AuthRequest, thunkAPI) => {
    try {
      const response = await AuthService.login(loginId, password);
      thunkAPI.dispatch(setMessage(response.message));
      const token = response.data?.access ?? response.data?.refresh ?? "";

      return {
        user: getTokenData(token),
        token: response.data ?? nullTokenStorage,
      };
    } catch (_error) {
      const error = _error as ApiResponse<AuthResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * logout
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  return AuthService.logout();
});

/**
 * Verify token
 */
export const verify = createAsyncThunk("auth/verify", async (_, thunkAPI) => {
  try {
    const response = await AuthService.verify();
    thunkAPI.dispatch(setMessage(response.status));
    return response.status;
  } catch (_error) {
    const error = _error as ApiResponse<AuthResponse>;
    const message = error.status || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * Refresh token
 */
export const refresh = createAsyncThunk(
  "auth/refresh",
  async ({ refresh }: AuthRefreshRequest, thunkAPI) => {
    try {
      const response = await AuthService.refresh(refresh);
      thunkAPI.dispatch(setMessage(response.message));
      const token = response.data?.access ?? response.data?.refresh ?? "";

      return {
        user: getTokenData(token),
        token: response.data ?? nullTokenStorage,
      };
    } catch (_error) {
      const error = _error as ApiResponse<AuthResponse>;
      const message = error.message || error.status || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setUserFromToken = createAsyncThunk(
  "auth/setUser",
  async (token: string | null = tokenStorage.access, thunkAPI) => {
    if (!token) return thunkAPI.rejectWithValue(token);
    return {
      user: getTokenData(token),
      token: tokenStorage,
    };
  }
);

const initialState: AuthState = user
  ? { isLoggedIn: true, user, token: tokenStorage }
  : { isLoggedIn: false, user: null, token: tokenStorage };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state = { isLoggedIn: false, user: null, token: nullTokenStorage };
      return state;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AuthStatePayload>) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = nullTokenStorage;
    });

    // Refresh
    builder.addCase(
      refresh.fulfilled,
      (state, action: PayloadAction<AuthStatePayload>) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addCase(refresh.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = nullTokenStorage;
    });

    // Verify
    builder.addCase(verify.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = {
        access: null,
        refresh:
          tokenStorage.refresh ?? localStorage.getItem(REFRESH_TOKEN_KEY),
      };
    });
  },
});

const { reducer, actions } = authSlice;

export const { reset } = actions;
export default reducer;
