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
        { withCredentials: true }
      );
      console.log(response.data)
    } catch (error) {
      console.log("something went wrong while completing the profile");
    }
  }
  async editProfile ({profilePicture, phone, location, university, college}) {
      try {
        
      } catch (error) {
        
      }
  }
}
const profileService = new ProfileService();
export default profileService;
