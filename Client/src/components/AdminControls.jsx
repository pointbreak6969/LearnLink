import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AdminControls = ({ children, adminId }) => {
  const userId = useSelector((state) => state.auth.userData._id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(userId === adminId);
  }, [userId, adminId]);

  return isVisible ? <div>{children}</div> : null;
};

export default AdminControls;
