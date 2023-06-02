interface TokenStorage {
  access: string | null;
  refresh: string | null;
}

interface AuthState extends AuthStatePayload {
  isLoggedIn: boolean;
}

interface AuthStatePayload {
  isLoggedIn?: boolean;
  user: {
    loginId: string;
    deviceId: number;
  } | null;
  token: TokenStorage;
}
