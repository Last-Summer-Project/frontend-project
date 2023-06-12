import { ENDPOINT } from "~/const/api/detect";
import { axiosDefaultInstance, errorResponseBody, responseBody } from ".";

async function request(imageBase64: string) {
  return axiosDefaultInstance
    .post(ENDPOINT.REQUEST, { imageBase64 })
    .then((res) => responseBody<Detection>(res))
    .catch((res) => {
      throw errorResponseBody<Detection>(res);
    });
}

const Detect = {
  request,
};

export default Detect;
