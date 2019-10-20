import { API } from "../configuration/axiosConfig";
import { AsyncSessionStorage } from "../Utils/AsyncStorage";

const validateJWT = (jwt = null) => {
  if (!jwt) return null;

  return /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(jwt);
};

export const decodeJWTPayload = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const getTokenFromSession = () => {
  const jwt = sessionStorage.getItem("token");

  if (!validateJWT(jwt)) {
    return null;
  }

  const payload = decodeJWTPayload(jwt);

  return { jwt, payload };
};

export const isUserAuthorized = allowedRoles => {
  const session = getTokenFromSession();

  if (session) {
    let authorized = session.payload.roles
      .split(",")
      .some(role => allowedRoles.includes(role));

    return authorized ? session : false;
  }

  return false;
};
export const setTokenOnSession = token => {
  return AsyncSessionStorage.setItem("token", token);
};

export const removeTokenFromSession = () => {
  return sessionStorage.removeItem("token");
};

export const getResetToken = async () => {
  try {
    const response = await API.post("/refresh-token", {});

    if (response.data) {
      const resetToken = response.data.refreshed_token;
      await setTokenOnSession(response.data.refreshed_token);

      return resetToken;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
