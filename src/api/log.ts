import { ENDPOINT } from "~/const/api/log";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

export function convert(old: LogResponseRaw): LogResponse {
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
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

async function latest_detected() {
  return axiosDefaultInstance
    .get(ENDPOINT.LATEST_DETECTED)
    .then(res => responseBody<LogResponseRaw>(res))
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

async function detected_per_day() {
  return axiosDefaultInstance
    .get(ENDPOINT.DETECTED_PER_DAY)
    .then(res => responseBody<LogResponseRaw[]>(res))
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}



async function recent() {
  return axiosDefaultInstance
    .get(ENDPOINT.RECENT)
    .then(res => responseBody<LogResponseRaw[]>(res))
    .catch(res => {
      throw errorResponseBody<LogResponse | LogResponseRaw>(res);
    });
}

const DeviceLog = {
  latest,
  latest_detected,
  detected_per_day,
  recent
};

export default DeviceLog;
