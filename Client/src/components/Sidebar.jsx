import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSelector, useDispatch } from "react-redux";
import authService from "@/services/auth";
import { logout } from "@/store/authSlice";
import { toast } from "sonner";
import { LogOut, Shield } from "lucide-react";

// User menu items
const userItems = [
  { title: "Home", url: "/" },
  { title: "Courses", url: "/courses" },
  { title: "About Us", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "Classroom", url: "/classroom" },
  { title: "Search Classrooms", url: "/searchclassrooms" },
  { title: "Reward", url: "/reward" },
];

// Admin menu items
const adminItems = [
  { title: "Admin Dashboard", url: "/admin" },
  { title: "Classroom Admin", url: "/admin/classroom" },
  { title: "Join Requests", url: "/admin/classroomrequest" },
  { title: "User Directory", url: "/admin/userinfo" },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const userProfile = useSelector((state) => state.profile?.profileDetails?.profilePicture?.url);
  const userData = useSelector((state) => state.auth?.userData);
  const authStatus = useSelector((state) => state.auth?.status);
  const isSuperAdmin = userData?.role === "superadmin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setSidebarOpen(false);
      await authService.logout();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  const navItems = isSuperAdmin ? adminItems : userItems;

  return (
    <Sidebar side="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
      {!authStatus ? (
        <>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/login" onClick={() => setSidebarOpen(false)}>
                    Login
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                    Signup
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarSeparator />
        </>
      ) : isSuperAdmin ? (
        <SidebarHeader className="p-4 bg-brand-50 border-b border-brand-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <div>
              <p className="font-bold text-sm text-ink-900">{userData?.fullName || "Admin"}</p>
              <span className="text-[10px] bg-brand-200 text-brand-800 font-bold px-1.5 py-0.5 rounded">
                Super Admin
              </span>
            </div>
          </div>
        </SidebarHeader>
      ) : null}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} onClick={() => setSidebarOpen(false)}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {authStatus && (
        <SidebarFooter>
          <SidebarMenu>
            {!isSuperAdmin && (
              <SidebarMenuItem>
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-brand-50"
                >
                  <img
                    src={userProfile}
                    className="h-9 w-9 rounded-full object-cover bg-ink-100"
                    alt="Profile"
                  />
                  <p className="font-medium text-ink-800">Profile</p>
                </Link>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
