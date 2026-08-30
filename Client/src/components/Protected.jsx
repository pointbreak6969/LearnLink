import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Protected({
  children,
  authentication = false,
  requireSuperAdmin = false,
  userOnly = false,
  redirectPath = "/",
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const isSuperAdmin = userData?.role === "superadmin";

  useEffect(() => {
    // For protected routes (authentication = true)
    if (authentication && !authStatus) {
      navigate("/login", { replace: true });
      return;
    }

    // For public / auth only routes (authentication = false)
    if (!authentication && authStatus) {
      if (isSuperAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate(redirectPath === "/" ? "/classroom" : redirectPath, { replace: true });
      }
      return;
    }

    // For superadmin required routes
    if (authentication && requireSuperAdmin && userData && !isSuperAdmin) {
      toast.error("Access denied: Super Admin privileges required");
      navigate("/classroom", { replace: true });
      return;
    }

    // For normal user only routes (Super Admins only access Admin Panel)
    if (authentication && userOnly && isSuperAdmin) {
      navigate("/admin", { replace: true });
      return;
    }

    setLoader(false);
  }, [authStatus, userData, isSuperAdmin, navigate, authentication, requireSuperAdmin, userOnly, redirectPath]);

  return loader ? (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
    </div>
  ) : (
    <>{children}</>
  );
}



