import axios from "axios";
import { baseUrl } from "@/lib/constants";
export class AuthService {
  async createUser({ fullName, email, password }) {
    try {
      const response = await axios.post(
        `${baseUrl}/user/register`,
        { fullName, email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        return this.login({ email, password });
      } else {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
  async login({ email, password }) {
    try {
     const response = await axios.post(
      `${baseUrl}/user/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
  async getCurrentUser(){
    try {
        return await axios.get( `${baseUrl}/user/me`, {
          withCredentials: true,
        });
    } catch (error) {
      throw error;
    }
    return null;
  }
  async logout(){
    try {
        return await axios.post(`${baseUrl}/user/logout`,{}, {
          withCredentials: true,
        });
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService; 
