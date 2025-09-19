import axios from "axios";
import { baseUrl } from "@/lib/constants";
import {
  Classroom,
  CreateClassroomData,
  UpdateClassroomData,
  User,
} from "@/types";

class ClassroomService {
  async createClassroom({
    classroomName,
    universityName,
    facultyName,
  }: CreateClassroomData): Promise<Classroom> {
    try {
      if (!(classroomName && universityName && facultyName)) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        `${baseUrl}/classroom/create`,
        {
          classroomName: classroomName.trim(),
          universityName: universityName.trim(),
          facultyName: facultyName.trim(),
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async updateClassroomDetails(
    classroomId: string,
    { newClassroomName, newFacultyName, newUniversityName }: UpdateClassroomData
  ): Promise<Classroom> {
    console.log("i am running");
    try {
      const updateData: Partial<UpdateClassroomData> = {};

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
      console.log(response);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Failed to update classroom"
        );
      } else {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
    }
  }

  async getAllClassrooms(): Promise<Classroom[]> {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getAllClassrooms`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getClassroomByQuery({
    universityName,
    facultyName,
  }: {
    universityName?: string;
    facultyName?: string;
  }): Promise<Classroom[]> {
    try {
      const queryParams: any = {};
      if (universityName) queryParams.universityName = universityName;
      if (facultyName) queryParams.facultyName = facultyName;

      if (Object.keys(queryParams).length === 0) {
        throw new Error("At least one query parameter is required");
      }

      const response = await axios.get(
        `${baseUrl}/classroom/getClassroomByQuery`,
        { params: queryParams, withCredentials: true }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async joinClassroomByCode({ code }: { code: string }): Promise<any> {
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async joinClassroomByLink({ code }: { code: string }): Promise<any> {
    try {
      if (!code) {
        throw new Error("Classroom Link is required");
      }
      const response = await axios.post(
        `${baseUrl}/classroom/joinByClassroomLink`,
        { code },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getUserAllClassroom(): Promise<Classroom[]> {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getUserClassroom`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getClassroomDetails({
    classroomId,
  }: {
    classroomId: string;
  }): Promise<Classroom> {
    try {
      if (!classroomId) {
        throw new Error("Classroom ID is required");
      }
      const response = await axios.get(
        `${baseUrl}/classroom/getClassroomDetails/${classroomId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getSuggestedClassrooms(page = 1): Promise<Classroom[]> {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getSuggestedClassroom?page=${page}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getPublicClassrooms(): Promise<Classroom[]> {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getPublicClassroom`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getClassroomUsers(classroomId: string): Promise<User[]> {
    try {
      const response = await axios.get(
        `${baseUrl}/classroom/getClassroomUsers`,
        {
          withCredentials: true,
          params: { classroomId },
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async requestTojoin({ id }: { id: string }): Promise<any> {
    try {
      const response = await axios.post(
        `${baseUrl}/classroom/requestTojoin`,
        { id },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getJoinRequest({ id }: { id: string }): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}/classroom/getJoinRequest`, {
        withCredentials: true,
        params: { id },
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async userRequestToadmin({
    id,
    status,
    userId,
  }: {
    id: string;
    status: string;
    userId: string;
  }): Promise<any> {
    try {
      const response = await axios.post(
        `${baseUrl}/classroom/userRequestToadmin`,
        { id, status, userId },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
}

const classroomService = new ClassroomService();
export default classroomService;
