import { ENDPOINT } from "~/const/api/timelapse";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

function convertResponse(old: TimelapseResponseRaw): TimelapseResponse {
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

function convertRequest(old: TimelapseRequest): TimelapseRequestRaw {
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
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<TimelapseResponse> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: convertResponse(data)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<TimelapseResponse | TimelapseResponseRaw>(res);
    });
}

async function all() {
  return axiosDefaultInstance
    .get(ENDPOINT.ALL)
    .then(res => responseBody<TimelapseResponseRaw[]>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<TimelapseResponse[]> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: data.map(convertResponse)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<TimelapseResponse[] | TimelapseResponseRaw[]>(res);
    });
}

async function request(data: TimelapseRequest) {
  return axiosDefaultInstance
    .post(ENDPOINT.LATEST, convertRequest(data))
    .then(res => responseBody<TimelapseResponseRaw>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<TimelapseResponse> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: convertResponse(data)
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<TimelapseResponse | TimelapseResponseRaw>(res);
    });
}

const Device = {
  latest,
  all,
  request
};

export default Device;
