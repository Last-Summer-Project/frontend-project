import Auth from "~/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "~/const/auth";

function setAuthData(res: AuthResponse | undefined) {
  const accessToken = res?.access ?? "";
  const refreshToken = res?.refresh ?? "";
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

async function login(loginId: string, password: string) {
  return Auth.login({ loginId, password }).then(res => {
    setAuthData(res.data);

    return res;
  });
}

function logout() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

async function refresh(refresh: string) {
  return Auth.refresh({ refresh }).then(res => {
    setAuthData(res.data);

    return res;
  });
}

async function verify() {
  return Auth.verify();
}

const AuthService = {
  login,
  logout,
  refresh,
  verify
};

export default AuthService;
