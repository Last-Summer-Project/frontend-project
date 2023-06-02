import { ENDPOINT } from "~/const/api/log";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

function convert(old: LogResponseRaw): LogResponse {
  return {
    deviceId: old.deviceId,
    humidity: old.humidity,
    temperature: old.humidity,
    imageUrl: old.imageUrl,
    detection: old.detection,
    timestamp: new Date(old.timestamp)
  };
}

async function latest() {
  return axiosDefaultInstance
    .get(ENDPOINT.LATEST)
    .then(res => responseBody<LogResponseRaw>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<LogResponse> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: convert(data)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

async function latest_detected() {
  return axiosDefaultInstance
    .get(ENDPOINT.LATEST_DETECTED)
    .then(res => responseBody<LogResponseRaw>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<LogResponse> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: convert(data)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

async function recent() {
  return axiosDefaultInstance
    .get(ENDPOINT.RECENT)
    .then(res => responseBody<LogResponseRaw[]>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<LogResponse[]> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: data.map(convert)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

const Device = {
  latest,
  latest_detected,
  recent
};

export default Device;
