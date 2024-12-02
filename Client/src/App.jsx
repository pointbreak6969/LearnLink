import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import axios from "axios";
import { baseUrl } from "./lib/constants";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const { user, loading, authStatus } = useAuth();
  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post("/user/refresh-token", {}, { withCredentials: true });
                return api(originalRequest);
            } catch (error) {
                navigate("/login");
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="loader"></p>
      </div>
    );
  }
  return (
    <>
      <Toaster position="top-center" richColors closeButton theme="light" />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
