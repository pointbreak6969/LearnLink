import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Trash2,
  Phone,
  MapPin,
  Mail,
  User,
  Award,
  Shield,
  ShieldAlert,
  GraduationCap,
  Folder,
  X,
  Loader2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import adminService from "@/services/admin";
import AvatarComponent from "@/components/AvatarComponent";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { universities } from "@/components/CreateClassroom";

const rowsPerPage = 8;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

  const currentLoggedUser = useSelector((state) => state.auth?.userData);

  // Modals
  const [viewUserModal, setViewUserModal] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [roleChangeModal, setRoleChangeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers({
        page,
        limit: rowsPerPage,
        search,
        university: selectedUniversity,
        role: selectedRole,
      });
      setUsers(data.users || []);
      setTotalUsers(data.totalUsers || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedUniversity, selectedRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenViewModal = async (u) => {
    setViewUserModal(u);
    try {
      setLoadingDetails(true);
      const data = await adminService.getUserDetails(u._id);
      setUserDetails(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load user details");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleRoleChange = async () => {
    if (!roleChangeModal) return;
    const newRole = roleChangeModal.role === "superadmin" ? "user" : "superadmin";
    try {
      setIsSubmitting(true);
      await adminService.updateUserRole(roleChangeModal._id, newRole);
      toast.success(`User role updated to ${newRole}`);
      setRoleChangeModal(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to change user role");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModal) return;
    try {
      setIsSubmitting(true);
      await adminService.deleteUser(deleteModal._id);
      toast.success("User account deleted successfully");
      setDeleteModal(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-brand-50 via-white to-brand-100/40 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-brand-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="text-brand-700 hover:bg-brand-50">
              <Link to="/admin">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-ink-900 flex items-center gap-2">
                <Users className="w-8 h-8 text-brand-600" />
                User Directory & Roles
              </h1>
              <p className="text-sm text-ink-500">
                Inspect registered users, manage Super Admin roles, and control system access.
              </p>
            </div>
          </div>
          <div className="text-sm font-medium bg-brand-50 text-brand-800 border border-brand-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            Total Users: <strong>{totalUsers}</strong>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-ink-700">Filter:</span>
            <select
              className="px-3.5 py-2 rounded-xl border border-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800 bg-white"
              value={selectedUniversity}
              onChange={(e) => {
                setSelectedUniversity(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Universities</option>
              {universities.map((uni) => (
                <option key={uni.value} value={uni.label}>
                  {uni.label}
                </option>
              ))}
            </select>

            <select
              className="px-3.5 py-2 rounded-xl border border-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800 bg-white"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Roles</option>
              <option value="superadmin">Super Admins</option>
              <option value="user">Regular Users</option>
            </select>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by full name or email..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Search className="absolute left-3 top-2.5 text-brand-400 w-4 h-4" />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-brand-200 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-brand-100 text-sm">
            <thead className="bg-brand-50 text-brand-800">
              <tr>
                <th className="px-4 py-3.5 text-left font-semibold">SN</th>
                <th className="px-4 py-3.5 text-left font-semibold">User</th>
                <th className="px-4 py-3.5 text-left font-semibold">Email</th>
                <th className="px-4 py-3.5 text-center font-semibold">Role</th>
                <th className="px-4 py-3.5 text-left font-semibold">University</th>
                <th className="px-4 py-3.5 text-center font-semibold">Points</th>
                <th className="px-4 py-3.5 text-left font-semibold">Joined</th>
                <th className="px-4 py-3.5 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-ink-400">
                    <Loader2 className="w-7 h-7 animate-spin mx-auto text-brand-500 mb-2" />
                    Loading user directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-ink-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr
                    key={u._id}
                    className={`transition-colors duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-brand-50/30"
                    } hover:bg-brand-50`}
                  >
                    <td className="px-4 py-3.5 text-ink-500 font-medium">
                      {(page - 1) * rowsPerPage + idx + 1}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <AvatarComponent
                          fullName={u.fullName}
                          profilePicture={u.profile?.profilePicture?.url || "?"}
                        />
                        <span className="font-semibold text-ink-900">{u.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-ink-600 font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {u.role === "superadmin" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          <Shield className="w-3 h-3 text-purple-600" /> Super Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-ink-700 text-xs">
                      {u.profile?.contactInfo?.university || "Not set"}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                        <Award className="w-3 h-3 text-amber-500" />
                        {u.profile?.pointsEarned || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-500 text-xs whitespace-nowrap">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenViewModal(u)}
                          className="p-1.5 text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {u._id !== currentLoggedUser?._id && (
                          <>
                            <button
                              onClick={() => setRoleChangeModal(u)}
                              className="p-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                              title={
                                u.role === "superadmin"
                                  ? "Demote to User"
                                  : "Promote to Super Admin"
                              }
                            >
                              <ShieldAlert className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModal(u)}
                              className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center bg-white px-5 py-3.5 rounded-2xl border border-brand-200 shadow-sm">
            <span className="text-xs text-ink-500 font-medium">
              Showing page {page} of {totalPages} ({totalUsers} total)
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 px-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => (
                  <div key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-1 text-ink-400">...</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 text-xs rounded-lg font-bold transition ${
                        page === p
                          ? "bg-brand-500 text-white shadow-xs"
                          : "text-ink-700 hover:bg-brand-50"
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-8 px-2"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* View User Modal */}
        {viewUserModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => {
              setViewUserModal(null);
              setUserDetails(null);
            }}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setViewUserModal(null);
                  setUserDetails(null);
                }}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-brand-600" />
                User Profile & Activity
              </h2>

              <div className="flex items-center gap-3 p-4 bg-brand-50/70 rounded-xl mb-4">
                <AvatarComponent
                  fullName={viewUserModal.fullName}
                  profilePicture={viewUserModal.profile?.profilePicture?.url || "?"}
                />
                <div>
                  <h3 className="font-bold text-base text-ink-900 flex items-center gap-2">
                    {viewUserModal.fullName}
                    {viewUserModal.role === "superadmin" && (
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                        Super Admin
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-ink-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {viewUserModal.email}
                  </p>
                </div>
              </div>

              {loadingDetails ? (
                <div className="py-8 text-center text-ink-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-500 mb-1.5" />
                  Fetching activity and profile details...
                </div>
              ) : (
                <div className="space-y-4 text-sm text-ink-700">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <strong className="text-xs text-ink-500 uppercase block">Phone</strong>
                      <span className="flex items-center gap-1 text-xs mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-brand-500" />
                        {userDetails?.profile?.contactInfo?.phone || "N/A"}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs text-ink-500 uppercase block">Location</strong>
                      <span className="flex items-center gap-1 text-xs mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {userDetails?.profile?.contactInfo?.location || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <strong className="text-xs text-ink-500 uppercase block">University</strong>
                      <span className="text-xs mt-0.5 block">
                        {userDetails?.profile?.contactInfo?.university || "N/A"}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs text-ink-500 uppercase block">Points Earned</strong>
                      <span className="text-xs font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {userDetails?.profile?.pointsEarned || 0} pts
                      </span>
                    </div>
                  </div>

                  {/* Created Classrooms */}
                  <div className="pt-3 border-t border-brand-100">
                    <strong className="text-xs text-ink-500 uppercase flex items-center gap-1 mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                      Created Classrooms ({userDetails?.createdClassrooms?.length || 0})
                    </strong>
                    {userDetails?.createdClassrooms?.length > 0 ? (
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {userDetails.createdClassrooms.map((c) => (
                          <div
                            key={c._id}
                            className="p-2 bg-brand-50/50 rounded-lg text-xs flex justify-between items-center"
                          >
                            <span className="font-semibold text-ink-900">{c.name}</span>
                            <span className="font-mono text-ink-400 text-[11px]">{c.code}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ink-400">Has not created any classrooms yet.</p>
                    )}
                  </div>

                  {/* Enrolled Classrooms */}
                  <div className="pt-2">
                    <strong className="text-xs text-ink-500 uppercase flex items-center gap-1 mb-2">
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      Enrolled Classrooms ({userDetails?.enrolledClassrooms?.length || 0})
                    </strong>
                    {userDetails?.enrolledClassrooms?.length > 0 ? (
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {userDetails.enrolledClassrooms.map((c) => (
                          <div
                            key={c._id}
                            className="p-2 bg-brand-50/50 rounded-lg text-xs flex justify-between items-center"
                          >
                            <span className="font-semibold text-ink-900">{c.name}</span>
                            <span className="font-mono text-ink-400 text-[11px]">{c.code}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ink-400">Not enrolled in any classrooms.</p>
                    )}
                  </div>

                  {/* Uploaded Resources */}
                  <div className="pt-2">
                    <strong className="text-xs text-ink-500 uppercase flex items-center gap-1 mb-2">
                      <Folder className="w-3.5 h-3.5 text-brand-600" />
                      Uploaded Resources ({userDetails?.uploadedResources?.length || 0})
                    </strong>
                    {userDetails?.uploadedResources?.length > 0 ? (
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {userDetails.uploadedResources.map((res) => (
                          <div
                            key={res._id}
                            className="p-2 bg-brand-50/50 rounded-lg text-xs flex justify-between items-center"
                          >
                            <span className="font-semibold text-ink-900 truncate max-w-[200px]">
                              {res.title || "Untitled Resource"}
                            </span>
                            <span className="text-ink-400 text-[11px]">
                              {formatDate(res.createdAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ink-400">Has not shared any resources yet.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewUserModal(null);
                    setUserDetails(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Role Change Confirmation Modal */}
        {roleChangeModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setRoleChangeModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-ink-900 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-purple-600" />
                Change User Role
              </h2>
              <p className="text-sm text-ink-600 mb-4 leading-relaxed">
                Are you sure you want to{" "}
                <strong>
                  {roleChangeModal.role === "superadmin"
                    ? "demote to regular User"
                    : "promote to Super Admin"}
                </strong>{" "}
                for <strong>{roleChangeModal.fullName}</strong> ({roleChangeModal.email})?
              </p>
              {roleChangeModal.role !== "superadmin" && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 mb-4">
                  <strong>Warning:</strong> Super Admins can manage all classrooms, approve student requests, and modify users across the entire application.
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setRoleChangeModal(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleRoleChange}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
                    </>
                  ) : (
                    "Confirm Role Change"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete User Modal */}
        {deleteModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setDeleteModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-red-600 mb-2">Delete User Account</h2>
              <p className="text-sm text-ink-600 mb-4 leading-relaxed">
                Are you sure you want to permanently delete user{" "}
                <strong>{deleteModal.fullName}</strong> ({deleteModal.email})? This will remove their profile and classroom memberships. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModal(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteUser}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                    </>
                  ) : (
                    "Confirm Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
