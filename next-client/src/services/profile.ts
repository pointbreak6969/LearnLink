import axios from "axios";
import { baseUrl } from "@/lib/constants";
import { UserProfile, ProfileFormData } from "@/types";

class ProfileService {
  async createProfile({
    profilePicture,
    phone,
    location,
    university,
    college,
  }: ProfileFormData): Promise<UserProfile> {
    try {
      const formData = new FormData();

      if (profilePicture && profilePicture.length > 0) {
        formData.append("profilePicture", profilePicture[0]);
      }
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("university", university);
      formData.append("college", college);

      const response = await axios.post(
        `${baseUrl}/profile/createProfile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async updateProfile({
    newProfilePicture,
    ...contactInfo
  }: {
    newProfilePicture?: FileList;
    [key: string]: any;
  }): Promise<UserProfile> {
    try {
      const formData = new FormData();

      // Append profile picture if provided
      if (newProfilePicture && newProfilePicture.length > 0) {
        formData.append("newProfilePicture", newProfilePicture[0]);
      }

      // Append other contact info
      Object.keys(contactInfo).forEach((key) => {
        if (contactInfo[key] !== undefined && contactInfo[key] !== "") {
          formData.append(key, contactInfo[key]);
        }
      });

      const response = await axios.patch(
        `${baseUrl}/profile/updateProfile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const response = await axios.get(`${baseUrl}/profile/getUserProfile`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
}

const profileService = new ProfileService();
export default profileService;
