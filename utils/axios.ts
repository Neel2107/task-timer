import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { BASE_URL, REFRESH_TOKEN } from "./apis";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } else {
        processQueue("Failed to refresh access token", null);

        return Promise.reject("Failed to refresh access token");
      }
    }

    console.error("Response interceptor error:", error);
    return Promise.reject(error);
  }
);

export default api;

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await SecureStore.getItemAsync("refresh_token");

  if (!refreshToken) {
    console.error("Refresh token is missing. Logging out user.");
    await clearStoredTokens();
    return null;
  }

  try {
    const response = await axios.post(
      REFRESH_TOKEN,
      { refresh_token: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;

    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", newRefreshToken);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    await clearStoredTokens();
    return null;
  } finally {
    isRefreshing = false;
  }
};

// Clear tokens from secure storage
const clearStoredTokens = async () => {
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync("refresh_token");
  Alert.alert("Session expired. Please log in again.");

};
