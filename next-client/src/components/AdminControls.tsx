import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface AdminControlsProps {
  children: React.ReactNode;
  adminId: string;
}

const AdminControls = ({ children, adminId }: AdminControlsProps) => {
  const userId = useSelector((state: any) => state.auth.userData._id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(userId === adminId);
  }, [userId, adminId]);

  return isVisible ? <div>{children}</div> : null;
};

export default AdminControls;
