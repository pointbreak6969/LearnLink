import axios from "axios";
import { baseUrl } from "@/lib/constants";
class ClassroomService {
  async createClassroom({ classroomName, universityName, facultyName }) {
    try {
      if (!(classroomName && universityName && facultyName)) {
        throw new Error("All fields are required");
      }
      const response = await axios.post(
        `${baseUrl}/classroom/createClassroom`,
        {
          classroomName,
          universityName,
          facultyName,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async updateClasroomDetails(
    classroomId,
    { newClassroomName, newFacultyName, newUniversityName }
  ) {
    try {
      const updateData = {};

      if (newClassroomName?.trim()) {
        updateData.newClassroomName = newClassroomName.trim();
      }

      if (newFacultyName?.trim()) {
        updateData.newFacultyName = newFacultyName.trim();
      }

      if (newUniversityName?.trim()) {
        updateData.newUniversityName = newUniversityName.trim();
      }
      const response = await axios.patch(
        `${baseUrl}/classroom/updateClassroom/${classroomId}`,
        updateData,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Failed to update classroom"
        );
      } else {
        throw new Error("Error updating classroom");
      }
    }
  }
  async getAllClassrooms() {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getAllClassrooms`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getClassroomByQuery({ universityName, facultyName }) {
    try {
      if (!universityName && !facultyName) {
        throw new Error(
          "At least one filter (university or faculty) is required"
        );
      }
      const queryParams = {};
      if (universityName) queryParams.universityName = universityName;
      if (facultyName) queryParams.facultyName = facultyName;
      const response = await axios.get(
        `${baseUrl}/classroom/getClassroomByQuery`,
        { params: queryParams, withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async joinClassroomByCode({ code }) {
    try {
      if (!code) {
        throw new Error("Classroom Code is required");
      }
      const response = await axios.post(
        `${baseUrl}/classroom/joinClassroom`,
        { code },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async joinClassroomByLink({ code }) {
    try {
      if (!code) {
        throw new Error("No code found");
      }
      const response = await axios.post(
        `${baseUrl}/classroom/joinClassroom/${code}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getUserAllClassroom() {
    try {
      const response = await axios.get(`${baseUrl}/user/getUserAllClassrooms`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getClassroomDetails({ classroomId }) {
    if (!classroomId) {
      throw new Error("Classroom id not found");
    }
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getClassroomDetails/${classroomId}`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const classroomService = new ClassroomService();
export default classroomService;
