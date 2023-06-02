import { axiosDefaultInstance, errorResponseBody, responseBody, setAuthorizationToken } from ".";

export async function login(data: AuthRequest) {
  return axiosDefaultInstance
    .post("/auth/login", data)
    .then(res => responseBody<AuthResponse>(res))
    .catch(res => {
      throw errorResponseBody<AuthResponse>(res);
    })
    .then(res => {
      const accessToken = res.data?.access ?? "";
      const refreshToken = res.data?.refresh ?? "";
      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAuthorizationToken(accessToken);
      return res
    });
}
