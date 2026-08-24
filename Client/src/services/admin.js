import axios from "axios";
import { baseUrl } from "@/lib/constants";

class AdminService {
  async getPlatformStats() {
    try {
      const response = await axios.get(`${baseUrl}/admin/stats`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch platform statistics";
      throw new Error(errorMessage);
    }
  }

  async getAllUsers({ page = 1, limit = 10, search = "", university = "All", role = "All" } = {}) {
    try {
      const response = await axios.get(`${baseUrl}/admin/users`, {
        params: { page, limit, search, university, role },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      throw new Error(errorMessage);
    }
  }

  async getUserDetails(id) {
    try {
      const response = await axios.get(`${baseUrl}/admin/users/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user details";
      throw new Error(errorMessage);
    }
  }

  async updateUserRole(id, role) {
    try {
      const response = await axios.patch(
        `${baseUrl}/admin/users/${id}/role`,
        { role },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update user role";
      throw new Error(errorMessage);
    }
  }

  async deleteUser(id) {
    try {
      const response = await axios.delete(`${baseUrl}/admin/users/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete user";
      throw new Error(errorMessage);
    }
  }

  async getAllClassrooms({ page = 1, limit = 10, search = "", university = "All", faculty = "All" } = {}) {
    try {
      const response = await axios.get(`${baseUrl}/admin/classrooms`, {
        params: { page, limit, search, university, faculty },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch classrooms";
      throw new Error(errorMessage);
    }
  }

  async updateClassroom(id, { name, university, faculty }) {
    try {
      const response = await axios.patch(
        `${baseUrl}/admin/classrooms/${id}`,
        { name, university, faculty },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update classroom";
      throw new Error(errorMessage);
    }
  }

  async deleteClassroom(id) {
    try {
      const response = await axios.delete(`${baseUrl}/admin/classrooms/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete classroom";
      throw new Error(errorMessage);
    }
  }

  async getAllPendingRequests() {
    try {
      const response = await axios.get(`${baseUrl}/admin/pending-requests`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch pending requests";
      throw new Error(errorMessage);
    }
  }

  async handlePendingRequest({ classroomId, userId, status }) {
    try {
      const response = await axios.post(
        `${baseUrl}/admin/handle-request`,
        { classroomId, userId, status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to handle join request";
      throw new Error(errorMessage);
    }
  }
}

const adminService = new AdminService();
export default adminService;
