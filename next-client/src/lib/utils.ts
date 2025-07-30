import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (error: any) => void }> = [];
const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
}
const api = axios.create({
  baseURL:
    (process.env.BACKEND_URL as string) || "http://localhost:5050/api/v1",
  withCredentials: true,
});
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await api.post("/user/refreshAccessToken");
//         if (response.status === 200) {
//           return api(originalRequest);
//         }
//       } catch (e) {
//         console.error("Error refreshing token:", e);
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(() => api(originalRequest))
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axios.post(
            'http://localhost:5050/api/v1/user/refreshAccessToken',
            {},
            { withCredentials: true } // ⬅️ again, required for cookie-based auth
          );

          processQueue(null);
          resolve(api(originalRequest)); // retry original request
        } catch (err) {
          processQueue(err);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);
export { api };
