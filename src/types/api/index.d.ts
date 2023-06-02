interface ApiResponse<T> {
  httpStatus: number;
  status: "ok" | "fail" | "error";
  message?: string;
  data?: T;
}

type Status = "NOT_STARTED" | "IN_PROGRESS" | "DONE";
