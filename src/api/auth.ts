import { ENDPOINT } from "~/const/auth";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

async function login(data: AuthRequest) {
  return axiosDefaultInstance
    .post(ENDPOINT.LOGIN, data)
    .then(res => responseBody<AuthResponse>(res))
    .catch(res => {
      throw errorResponseBody<AuthResponse>(res);
    });
}

async function refresh(data: AuthRefreshRequest) {
  return axiosDefaultInstance
    .post(ENDPOINT.REFRESH, data)
    .then(res => responseBody<AuthResponse>(res))
    .catch(res => {
      throw errorResponseBody<AuthResponse>(res);
    });
}


async function verify() {
  return axiosDefaultInstance
    .post(ENDPOINT.VERIFY)
    .then(res => responseBody<AuthResponse>(res))
    .catch(res => {
      throw errorResponseBody<AuthResponse>(res);
    });
}


const Auth = {
  login,
  refresh,
  verify
};

export default Auth;
