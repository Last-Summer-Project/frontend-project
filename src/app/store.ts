import { configureStore } from "@reduxjs/toolkit";

import authReducer, { setUserFromToken } from "./slices/auth";
import logReducer from "./slices/log";
import timelapseReducer from "./slices/timelapse";
import detectReducer from "./slices/detect";
import messageReducer from "./slices/message";
import flagReducer from "./slices/flag";
import { ACCESS_TOKEN_KEY } from "~/const/auth";
import { setAuthorizationToken } from "~/app/api";

const reducer = {
  auth: authReducer,
  log: logReducer,
  timelapse: timelapseReducer,
  message: messageReducer,
  detect: detectReducer,
  flag: flagReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
if (accessToken) {
  setAuthorizationToken(accessToken);
  store.dispatch(setUserFromToken(accessToken));
}

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
