import { JWTPayload  } from "jose";

interface JWTPayload extends JWTPayload {
  sub: "some-service";
  login_id?: string;
  device_id?: number;
}


interface TokenStorage implements AuthResponse {
  access: string | null;
  refresh: string | null;
}
