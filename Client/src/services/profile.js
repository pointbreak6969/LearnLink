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
      formData.append("profilePicture", profilePicture[0]);
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
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async updateProfile({ newProfilePicture, ...contactInfo }) {
    try {
      const formData = new FormData();
      
      // Only append file if provided
      if (newProfilePicture) {
        formData.append('file', newProfilePicture[0]);
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
<<<<<<< HEAD
=======

>>>>>>> 468ccd9c015d6c65e53aefea2a748b7cb42a2d48
      const errorMessage = error.response?.data?.message || "An error occurred";
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
