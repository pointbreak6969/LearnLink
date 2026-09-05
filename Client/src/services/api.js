import axios from "axios";

export const getAccessToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (err) {
    console.error("Error reading accessToken from localStorage:", err);
    return null;
  }
};

export const setAccessToken = (token) => {
  try {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  } catch (err) {
    console.error("Error setting accessToken in localStorage:", err);
  }
};

export const clearAccessToken = () => {
  try {
    localStorage.removeItem("accessToken");
  } catch (err) {
    console.error("Error clearing accessToken from localStorage:", err);
  }
};

// Global Request Interceptor
axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global Response Interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If receiving 401 on an authenticated call, clear invalid/expired token
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const isAuthEndpoint =
        url.includes("/user/login") || url.includes("/user/register");
      if (!isAuthEndpoint) {
        clearAccessToken();
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
