import { Button } from "./ui/button";
import {logout} from "../store/authSlice.js"
import { useDispatch } from "react-redux";
import authService from "../services/auth.js";
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <Button
      variant="ghost"
      className="border-white text-lg hover:bg-orange-600"
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};
export default LogoutBtn;
