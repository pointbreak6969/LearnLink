import { LifeBuoy, LogOut, User, CreditCard, Shield, BookOpen } from "lucide-react";
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
  const isSuperAdmin = userData?.role === "superadmin";
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
        <DropdownMenuLabel className="flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-sm font-semibold text-ink-900 truncate">{fullName}</p>
            <p className="text-xs text-ink-400 font-normal truncate">{userData?.email}</p>
          </div>
          {isSuperAdmin && (
            <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded font-bold shrink-0">
              Admin
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isSuperAdmin ? (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/admin")}
                className="text-brand-700 font-medium focus:bg-brand-50 cursor-pointer"
              >
                <Shield className="text-brand-600 w-4 h-4" />
                <span>Admin Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/admin/classroom")}
                className="cursor-pointer"
              >
                <Shield className="w-4 h-4 text-ink-500" />
                <span>Classroom Admin</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/admin/classroomrequest")}
                className="cursor-pointer"
              >
                <Shield className="w-4 h-4 text-ink-500" />
                <span>Join Requests</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/admin/userinfo")}
                className="cursor-pointer"
              >
                <Shield className="w-4 h-4 text-ink-500" />
                <span>User Directory</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/courses")}
                className="cursor-pointer"
              >
                <BookOpen />
                <span>My Courses</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/reward")}
                className="cursor-pointer"
              >
                <CreditCard />
                <span>Rewards</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/contact")}
                className="cursor-pointer"
              >
                <LifeBuoy />
                <span>Contact</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 cursor-pointer">
          <LogOut className="text-red-600 w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
