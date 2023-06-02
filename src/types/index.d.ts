import { JWTPayload } from "jose";

interface JWTPayload extends JWTPayload {
  sub: "some-service";
  login_id?: string;
  device_id?: number;
}
