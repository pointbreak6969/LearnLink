import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const handleNavigation = () => {
    if (authStatus) {
      navigate("/classroom");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-ink-900 text-white text-xs py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span>Free courses — limited seats, get in now</span>
        </div>
      </div>

      <header className="border-b border-ink-100 bg-white/90 backdrop-blur-md text-ink-900 py-3 shadow-sm">
        <div className="flex justify-between items-center px-4 md:hidden">
          <button
            className="font-display text-2xl font-semibold text-ink-900"
            onClick={handleNavigation}
            aria-label="Logo"
          >
            Learn<span className="text-brand-500">Link</span>
          </button>
          <div>
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
            </SidebarProvider>
          </div>
        </div>

        <div className="hidden container mx-auto px-6 md:flex justify-between items-center">
          <button
            className="font-display text-2xl font-semibold text-ink-900"
            onClick={handleNavigation}
            aria-label="Logo"
          >
            Learn<span className="text-brand-500">Link</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex text-[15px] font-medium text-ink-600">
            <ul className="flex items-center gap-7">
              {!authStatus && (
                <Link to="/" className="cursor-pointer transition-colors hover:text-brand-600">
                  Home
                </Link>
              )}
              <Link
                to="/courses"
                className="cursor-pointer transition-colors hover:text-brand-600"
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="cursor-pointer transition-colors hover:text-brand-600"
              >
                About Us
              </Link>

              {/* Protected Routes */}
              {authStatus && (
                <>
                  <Link
                    to="/classroom"
                    className="cursor-pointer transition-colors hover:text-brand-600"
                  >
                    Classroom
                  </Link>
                  <Link
                    to="/searchclassrooms"
                    className="cursor-pointer transition-colors hover:text-brand-600"
                  >
                    Search
                  </Link>
                  {userData?.role === "superadmin" && (
                    <Link
                      to="/admin"
                      className="cursor-pointer transition-colors text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            {!authStatus ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            ) : (
              <div className="mr-auto">
                <UserAvatar />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
