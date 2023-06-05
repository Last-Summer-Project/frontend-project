import { ENDPOINT } from "~/const/api/device";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

async function get() {
  return axiosDefaultInstance
    .get(ENDPOINT.GET)
    .then(res => responseBody<DeviceResponseRaw>(res))
    .then(res => {
      const data = res.data;
      if (!data) throw res;

      const newRes: ApiResponse<DeviceResponse> = {
        httpStatus: res.httpStatus,
        status: res.status,
        message: res.message,
        data: {
          id: data.id,
          dateCreated: new Date(data.dateCreated),
          lastEdited: new Date(data.lastEdited)
        }
      };

      return newRes;
    })
    .catch(res => {
      throw errorResponseBody<AuthResponse>(res);
    });
}

const Device = {
  get
};

export default Device;
