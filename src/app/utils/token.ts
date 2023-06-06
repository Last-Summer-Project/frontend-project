import { decodeJwt } from "jose";
import { JWTPayload } from "~/types";

export function getTokenData(token: string) {
  try {
    const decodedJwt = decodeJwt(token) as JWTPayload;

    const deviceId = decodedJwt.device_id;
    const loginId = decodedJwt.login_id;

    if (!deviceId || !loginId) return null;

    return {
      deviceId,
      loginId,
    };
  } catch (_error) {
    console.error(_error);
    return null;
  }
}
