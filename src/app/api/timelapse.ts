import { ENDPOINT } from "~/const/api/timelapse";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

export function convertResponse(old: TimelapseResponseRaw): TimelapseResponse {
  return {
    id: old.id,
    deviceId: old.deviceId,
    status: old.status,
    result: old.result,
    logStartDate: new Date(old.logStartDate),
    logEndDate: new Date(old.logEndDate),
    lastUpdated: new Date(old.lastUpdated)
  };
}

export function convertRequest(old: TimelapseRequest): TimelapseRequestRaw {
  return {
    deviceId: old.deviceId,
    startDate: old.startDate.toISOString(),
    endDate: old.endDate.toISOString()
  }
}

async function latest() {
  return axiosDefaultInstance
    .get(ENDPOINT.LATEST)
    .then(res => responseBody<TimelapseResponseRaw>(res))
    .catch(res => {
      throw errorResponseBody<TimelapseResponse | TimelapseResponseRaw>(res);
    });
}

async function all() {
  return axiosDefaultInstance
    .get(ENDPOINT.ALL)
    .then(res => responseBody<TimelapseResponseRaw[]>(res))
    .catch(res => {
      throw errorResponseBody<TimelapseResponse[] | TimelapseResponseRaw[]>(res);
    });
}

async function request(data: TimelapseRequest) {
  return axiosDefaultInstance
    .post(ENDPOINT.LATEST, convertRequest(data))
    .then(res => responseBody<TimelapseResponseRaw>(res))
    .catch(res => {
      throw errorResponseBody<TimelapseResponse | TimelapseResponseRaw>(res);
    });
}

const Timelapse = {
  latest,
  all,
  request
};

export default Timelapse;
