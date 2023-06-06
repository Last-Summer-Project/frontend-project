import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosDefaultInstance = axios.create({
  baseURL: "/api/v1",
});

export function responseBody<T>(
  response: AxiosResponse<ApiResponse<T>>
): ApiResponse<T> {
  const data: ApiResponse<T> = response.data;
  data.httpStatus = response?.status ?? response;
  return data;
}

export function errorResponseBody<T>(error: AxiosError<ApiResponse<T>>) {
  return responseBody(error.response as AxiosResponse<ApiResponse<T>>);
}

export function setAuthorizationToken(token: string | undefined) {
  if (token) {
    axiosDefaultInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete axiosDefaultInstance.defaults.headers.common["Authorization"];
  }
}
