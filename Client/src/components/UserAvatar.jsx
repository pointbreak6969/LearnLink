import { LifeBuoy, LogOut, Settings, User, CreditCard } from "lucide-react";
import AvatarComponent from "./AvatarComponent.jsx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/auth.js";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/useProfile.js";
import { useMemo } from "react";
function UserAvatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileDetails, status } = useProfile();
  const userData = useSelector((state) => state.auth.userData);
  const fullName = userData?.fullName || "N/A";
  const profilePicture = useMemo(
    () => profileDetails?.profilePicture?.url || "?",
    [profileDetails]
  );
  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
        >
          {status === "loading" ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <AvatarComponent
              profilePicture={profilePicture}
              fullName={fullName}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/reward");
            }}
          >
            <CreditCard />
            <span>Rewards</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate("/contact");
          }}
        >
          <LifeBuoy />
          <span>Contact</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
