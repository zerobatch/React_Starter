import axios from "axios";
import { getTokenFromSession, getResetToken } from "../Utils/TokenUtils";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json"
});

/**
 * Añade el token automaticamente en cada request
 */
API.interceptors.request.use(
  function(config) {
    const session = getTokenFromSession();

    if (session) {
      config["headers"]["Authorization"] = `Bearer ${session.jwt}`;
    }

    return config;
  },
  error => {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

/**
 * Este interceptor refresca el token cuando este ha expirado para
 * una mejor experiencia de usuario
 */
API.interceptors.response.use(
  response => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  error => {
    const errorResponse = error.response;

    if (isTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error);
    }

    // If the error is due to other reasons, we just throw it back to axios
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

function isTokenExpiredError(errorResponse) {
  return (
    errorResponse.data &&
    (errorResponse.data.message === "Token has expired" ||
      errorResponse.data.message === "Token not provided")
  );
}

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const resetToken = await getResetToken(); // Your own mechanism to get the refresh token to refresh the JWT token

    if (!resetToken) {
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }

    errorResponse["config"]["headers"][
      "Authorization"
    ] = `Bearer ${resetToken}`;

    return new Promise((resolve, reject) => {
      axios
        .request(errorResponse.config)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export { API };
