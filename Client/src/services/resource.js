import axios from "axios";
import { baseUrl } from "@/lib/constants";
class ResourceService {
  async createResource({ title, text, files = [], classroomId }) {
    try {
      // Validate classroom ID
      if (!classroomId) {
        throw new Error("Classroom ID is required");
      }

      // Check if at least one field is provided
      if (!title && !text && files.length === 0) {
        throw new Error(
          "At least one of text, title, or resource file is required"
        );
      }

      // Validate file count if files are provided
      if (files.length > 20) {
        throw new Error("Can't upload more than 20 files at once");
      }

      const formData = new FormData();

      // Only append fields if they exist and have value
      if (title) formData.append("title", title);
      if (text) formData.append("text", text);
      formData.append("classroomId", classroomId);

      // Append files if any
      files.forEach((file) => {
        formData.append("resource", file);
      });

      const response = await axios.post(`${baseUrl}/resource/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data;
    } catch (error) {
      // If it's an API error, throw the specific message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
  async getUserUploadedResources() {
    try {
      const response = await axios.get(
        `${baseUrl}/resource/getUserUploadedResources`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
  async getClassroomResources(classroomId) {

    try {
      const response = await axios.get(
        `${baseUrl}/resource/getClassroomResources`,
 
        {
          withCredentials: true,
          params: {classroomId}
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}
const resourceService = new ResourceService();
export default resourceService;
