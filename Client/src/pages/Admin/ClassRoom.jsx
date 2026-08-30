import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  Users,
  Folder,
  X,
  ExternalLink,
  Shield,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import adminService from "@/services/admin";
import { toast } from "sonner";
import { universities } from "@/components/CreateClassroom";

const rowsPerPage = 8;

const ClassRoomAdmin = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClassrooms, setTotalClassrooms] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");

  // Modals
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    university: "",
    faculty: "",
  });

  const fetchClassrooms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllClassrooms({
        page,
        limit: rowsPerPage,
        search,
        university: selectedUniversity,
      });
      setClassrooms(data.classrooms || []);
      setTotalClassrooms(data.totalClassrooms || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedUniversity]);

  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
    setPage(1);
  };

  const openEditModal = (room) => {
    setEditModal(room);
    setEditForm({
      name: room.name || "",
      university: room.university || "",
      faculty: room.faculty || "",
    });
  };

  const handleUpdateClassroom = async (e) => {
    e.preventDefault();
    if (!editModal) return;
    try {
      setIsSubmitting(true);
      await adminService.updateClassroom(editModal._id, editForm);
      toast.success("Classroom updated successfully");
      setEditModal(null);
      fetchClassrooms();
    } catch (err) {
      toast.error(err.message || "Failed to update classroom");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClassroom = async () => {
    if (!deleteModal) return;
    try {
      setIsSubmitting(true);
      await adminService.deleteClassroom(deleteModal._id);
      toast.success("Classroom deleted successfully");
      setDeleteModal(null);
      fetchClassrooms();
    } catch (err) {
      toast.error(err.message || "Failed to delete classroom");
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
                <GraduationCap className="w-8 h-8 text-brand-600" />
                Classroom Admin
              </h1>
              <p className="text-sm text-ink-500">
                Manage, inspect, edit, or delete any classroom in LearnLink.
              </p>
            </div>
          </div>
          <div className="text-sm font-medium bg-brand-50 text-brand-800 border border-brand-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            Total Classrooms: <strong>{totalClassrooms}</strong>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-ink-700">Filter:</span>
            <select
              className="px-3.5 py-2 rounded-xl border border-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800 bg-white"
              value={selectedUniversity}
              onChange={handleUniversityChange}
            >
              <option value="All">All Universities</option>
              {universities.map((uni) => (
                <option key={uni.value} value={uni.label}>
                  {uni.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, creator, code..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800"
              value={search}
              onChange={handleSearchChange}
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
                <th className="px-4 py-3.5 text-left font-semibold">Classroom</th>
                <th className="px-4 py-3.5 text-left font-semibold">Code</th>
                <th className="px-4 py-3.5 text-left font-semibold">Creator</th>
                <th className="px-4 py-3.5 text-left font-semibold">University & Faculty</th>
                <th className="px-4 py-3.5 text-center font-semibold">Members</th>
                <th className="px-4 py-3.5 text-center font-semibold">Resources</th>
                <th className="px-4 py-3.5 text-left font-semibold">Created</th>
                <th className="px-4 py-3.5 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-ink-400">
                    <Loader2 className="w-7 h-7 animate-spin mx-auto text-brand-500 mb-2" />
                    Loading classrooms...
                  </td>
                </tr>
              ) : classrooms.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-ink-400">
                    No classrooms found matching your criteria.
                  </td>
                </tr>
              ) : (
                classrooms.map((room, idx) => (
                  <tr
                    key={room._id}
                    className={`transition-colors duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-brand-50/30"
                    } hover:bg-brand-50`}
                  >
                    <td className="px-4 py-3.5 text-ink-500 font-medium">
                      {(page - 1) * rowsPerPage + idx + 1}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-ink-900">
                      {room.name}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono bg-brand-100/70 text-brand-800 px-2 py-0.5 rounded text-xs">
                        {room.code}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-700">
                      {room.creator?.fullName || "Unknown"}
                    </td>
                    <td className="px-4 py-3.5 text-ink-600">
                      <div>{room.university}</div>
                      <div className="text-xs text-ink-400">{room.faculty}</div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        <Users className="w-3 h-3" /> {room.totalUsers}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                        <Folder className="w-3 h-3" /> {room.totalResources}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-500 whitespace-nowrap">
                      {formatDate(room.createdAt)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          to={`/admin/classroom/${room._id}`}
                          className="p-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                          title="Inspect Classroom Content"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setViewModal(room)}
                          className="p-1.5 text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(room)}
                          className="p-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                          title="Edit Classroom"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModal(room)}
                          className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                          title="Delete Classroom"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
              Showing page {page} of {totalPages} ({totalClassrooms} total)
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

        {/* View Details Modal */}
        {viewModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setViewModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewModal(null)}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-brand-600" />
                {viewModal.name}
              </h2>
              <div className="space-y-3.5 text-sm text-ink-700">
                <div className="p-3 bg-brand-50 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-brand-900">Classroom Code:</span>
                  <span className="font-mono bg-white text-brand-800 px-2.5 py-1 rounded border border-brand-200 font-bold">
                    {viewModal.code}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">University</strong>
                    <span>{viewModal.university}</span>
                  </div>
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Faculty</strong>
                    <span>{viewModal.faculty}</span>
                  </div>
                </div>
                <div>
                  <strong className="text-ink-500 text-xs uppercase block">Creator</strong>
                  <span>{viewModal.creator?.fullName} ({viewModal.creator?.email})</span>
                </div>
                {viewModal.coAdmins && viewModal.coAdmins.length > 0 && (
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Classroom Co-Admins</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {viewModal.coAdmins.map((adm) => (
                        <span key={adm._id} className="inline-flex items-center gap-1 text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full font-medium">
                          <Shield className="w-3 h-3 text-brand-600" />
                          {adm.fullName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-100">
                  <div className="text-center p-2 bg-brand-50/60 rounded-lg">
                    <span className="text-xs text-ink-500 block">Members</span>
                    <strong className="text-lg text-brand-800">{viewModal.totalUsers}</strong>
                  </div>
                  <div className="text-center p-2 bg-brand-50/60 rounded-lg">
                    <span className="text-xs text-ink-500 block">Resources</span>
                    <strong className="text-lg text-purple-700">{viewModal.totalResources}</strong>
                  </div>
                  <div className="text-center p-2 bg-brand-50/60 rounded-lg">
                    <span className="text-xs text-ink-500 block">Pending</span>
                    <strong className="text-lg text-amber-600">{viewModal.totalPendingRequests}</strong>
                  </div>
                </div>
                <div className="pt-2">
                  <strong className="text-ink-500 text-xs uppercase block">Created On</strong>
                  <span>{formatDate(viewModal.createdAt)}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewModal(null)}>
                  Close
                </Button>
                <Button asChild className="bg-brand-600 hover:bg-brand-700 text-white">
                  <Link to={`/admin/classroom/${viewModal._id}`}>
                    <ExternalLink className="w-4 h-4 mr-1.5" />
                    View Inside Classroom
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setEditModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditModal(null)}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-ink-900 mb-4">Edit Classroom</h2>
              <form onSubmit={handleUpdateClassroom} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-ink-600 mb-1">
                    Classroom Name
                  </label>
                  <Input
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter classroom name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-ink-600 mb-1">
                    University
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm rounded-lg border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-ink-800"
                    value={editForm.university}
                    onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                  >
                    {universities.map((uni) => (
                      <option key={uni.value} value={uni.label}>
                        {uni.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-ink-600 mb-1">
                    Faculty
                  </label>
                  <Input
                    required
                    value={editForm.faculty}
                    onChange={(e) => setEditForm({ ...editForm, faculty: e.target.value })}
                    placeholder="Enter faculty name"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditModal(null)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-600 hover:bg-brand-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setDeleteModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-red-600 mb-2">Delete Classroom</h2>
              <p className="text-sm text-ink-600 mb-4">
                Are you sure you want to delete <strong>{deleteModal.name}</strong>? All associated resources and student links will be permanently removed. This action cannot be undone.
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
                  onClick={handleDeleteClassroom}
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

export default ClassRoomAdmin;
