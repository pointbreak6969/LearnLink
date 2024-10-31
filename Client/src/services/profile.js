import axios from "axios";
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
        "http://localhost:5050/api/v1/profile/complete",
        { profilePicture, phone, location, university, college },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("something went wrong while completing the profile");
    }
  }
  async editProfile({ phone, location, university, college }) {
    try {
      const response = await axios.patch(
        "http://localhost:5050/api/v1/profile/edit",
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
      console.log(response.data);
    } catch (error) {
      console.log("Something went wrong while editing the details");
    }
  }
  async editProfilePicture({ profilePicture }) {
    try {
      const response = await axios.patch(
        "http://localhost:5050/api/v1/profile/editProfilePic",
        {
          withCredentials: true,
          headers: {
            "Content-Length": "multipart/form-data",
          },
        }
      );
      return response.data
    } catch (error) {
      console.log("error while updating the user profile")
    }
  }
  async getProfileDetails() {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/profile/get", {
        withCredentials: true
      })
      return response.data?.data?.[0] || null
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }
}
const profileService = new ProfileService();
export default profileService;
