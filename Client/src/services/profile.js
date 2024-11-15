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
      const response = await axios.post(
        `${baseUrl}/profile/complete`,
        { profilePicture, phone, location, university, college },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("something went wrong while completing the profile");
    }
  }
  async editProfile({ phone, location, university, college }) {
    try {
      const response = await axios.patch(
        `${baseUrl}/profile/edit`,
        {
          phone,
          location,
          university,
          college,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Something went wrong while editing the details");
    }
  }
  async editProfilePicture({ profilePicture }) {
    try {
      const response = await axios.patch(
        `${baseUrl}/profile/editProfilePic`,
        { profilePicture },
        {
          withCredentials: true,
          headers: {
            "Content-Length": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("error while updating the user profile");
    }
  }
  async getProfileDetails() {
    try {
      const response = await axios.get(`${baseUrl}/profile/get`, {
        withCredentials: true,
      });
      return response.data?.data?.[0] || null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}
const profileService = new ProfileService();
export default profileService;
