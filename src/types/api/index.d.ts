interface ApiResponse<T> {
  httpStatus: number;
  status: "ok" | "fail" | "error";
  message?: string;
  data?: T;
}
