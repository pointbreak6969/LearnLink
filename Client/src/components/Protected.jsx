import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Protected({
  children,
  authentication = false,
  requireSuperAdmin = false,
  redirectPath = "/",
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // For protected routes (authentication = true)
    if (authentication && !authStatus) {
      navigate("/login", { replace: true });
      return;
    }

    // For public only routes (authentication = false)
    if (!authentication && authStatus) {
      navigate(redirectPath, { replace: true });
      return;
    }

    // For superadmin required routes
    if (authentication && requireSuperAdmin && userData && userData.role !== "superadmin") {
      toast.error("Access denied: Super Admin privileges required");
      navigate("/classroom", { replace: true });
      return;
    }

    setLoader(false);
  }, [authStatus, userData, navigate, authentication, requireSuperAdmin, redirectPath]);

  return loader ? (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
    </div>
  ) : (
    <>{children}</>
  );
}



