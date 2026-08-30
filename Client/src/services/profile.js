import axios from "axios";
import { baseUrl } from "@/lib/constants";
class ProfileService {
  async completeProfile({
    profilePicture,
    phone,
    location,
    university,
    college,
  }) {
    try {
      const formData = new FormData();
      if (!profilePicture || !phone || !location || !university || !college) {
        throw new Error("All fields are required");
      }
      const fileToUpload =
        profilePicture instanceof FileList || Array.isArray(profilePicture)
          ? profilePicture[0]
          : profilePicture;
      formData.append("profilePicture", fileToUpload);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("university", university);
      formData.append("college", college);
      const response = await axios.post(
        `${baseUrl}/profile/complete`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async updateProfile({ newProfilePicture, profilePicture, ...contactInfo }) {
    try {
      const formData = new FormData();
      
      const fileToUpload = newProfilePicture || profilePicture;
      // Only append file if provided
      if (fileToUpload) {
        const actualFile =
          fileToUpload instanceof FileList || Array.isArray(fileToUpload)
            ? fileToUpload[0]
            : fileToUpload;
        if (actualFile instanceof File) {
          formData.append('file', actualFile);
        }
      }
  
      // Only append non-null contact info fields
      Object.entries(contactInfo).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
  
      const response = await axios.patch(
        `${baseUrl}/profile/updateProfile`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
  async getProfileDetails() {
    try {
      const response = await axios.get(`${baseUrl}/profile/get`, {
        withCredentials: true,
      });
      return response.data?.data?.[0] || null;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
}
const profileService = new ProfileService();
export default profileService;
