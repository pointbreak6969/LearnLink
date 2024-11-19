import { useSelector } from "react-redux";
const AdminControls = ({ children }) => {
  const userId = useSelector(state => state.auth.userData._id);
  console.log(userId);
  return <div>AdminControls</div>;
};
export default AdminControls;
