import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { verify } from "../slices/auth";
import { refresh } from "../slices/auth";

/**
 * check Logged In. and try refresh if not logged in.
 *
 * @param auth
 * @param dispatch
 * @returns true if logged in.
 */
export async function checkLoggedIn(
  auth: AuthState,
  dispatch: ThunkDispatch<AppDispatch, undefined, AnyAction> &
    Dispatch<AnyAction>
) {
  if (auth.isLoggedIn) {
    try {
      const verified = (await dispatch(verify()).unwrap()) == "ok";
      if (verified) return true;
    } catch (_) {
      // Pass
    }
  }

  if (auth.token.refresh) {
    try {
      const refreshed = await dispatch(
        refresh({ refresh: auth.token.refresh })
      ).unwrap();
      if (refreshed.user) return true;
    } catch (_) {
      // Pass
    }
  }

  return false;
}

export async function refreshToken(
  auth: AuthState,
  dispatch: ThunkDispatch<AppDispatch, undefined, AnyAction> &
    Dispatch<AnyAction>
) {
  if (auth.token.refresh) {
    try {
      const refreshed = await dispatch(
        refresh({ refresh: auth.token.refresh })
      ).unwrap();
      if (refreshed.user) return true;
    } catch (_) {
      // Pass
    }
  }

  return false;
}

