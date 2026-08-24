import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Search,
  ArrowLeft,
  GraduationCap,
  Mail,
  Calendar,
  X,
  Loader2,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import adminService from "@/services/admin";
import AvatarComponent from "@/components/AvatarComponent";
import { toast } from "sonner";

const PendingClassroomAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClassroomFilter, setSelectedClassroomFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchPendingRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllPendingRequests();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load pending requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const handleAction = async (classroomId, userId, status, studentName) => {
    const key = `${classroomId}-${userId}`;
    try {
      setProcessingId(key);
      await adminService.handlePendingRequest({ classroomId, userId, status });
      if (status === "accept") {
        toast.success(`Approved ${studentName} into the classroom`);
      } else {
        toast.info(`Rejected request for ${studentName}`);
      }
      setRequests((prev) =>
        prev.filter((r) => !(r.classroomId === classroomId && r.studentId === userId))
      );
      if (selectedRequest && selectedRequest.classroomId === classroomId && selectedRequest.studentId === userId) {
        setSelectedRequest(null);
      }
    } catch (err) {
      toast.error(err.message || "Failed to process request");
    } finally {
      setProcessingId(null);
    }
  };

  const classroomsList = Array.from(
    new Set(requests.map((r) => r.classroomName))
  );

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      r.studentEmail?.toLowerCase().includes(search.toLowerCase()) ||
      r.classroomName?.toLowerCase().includes(search.toLowerCase()) ||
      r.classroomCode?.toLowerCase().includes(search.toLowerCase());

    const matchesClassroom =
      selectedClassroomFilter === "All" || r.classroomName === selectedClassroomFilter;

    return matchesSearch && matchesClassroom;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "Just now";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-brand-50 via-white to-brand-100/40 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-brand-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="text-brand-700 hover:bg-brand-50">
              <Link to="/admin">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-ink-900 flex items-center gap-2">
                <CheckCircle className="w-8 h-8 text-amber-500" />
                Pending Join Approvals
              </h1>
              <p className="text-sm text-ink-500">
                Global inbox of students requesting admission to any classroom.
              </p>
            </div>
          </div>
          <div className="text-sm font-medium bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
            <span>Pending Total:</span>
            <strong className="text-amber-700 font-bold text-base">{requests.length}</strong>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-ink-700">Filter Classroom:</span>
            <select
              className="px-3.5 py-2 rounded-xl border border-brand-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800 bg-white"
              value={selectedClassroomFilter}
              onChange={(e) => setSelectedClassroomFilter(e.target.value)}
            >
              <option value="All">All Classrooms</option>
              {classroomsList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by student, email, class..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-brand-400 w-4 h-4" />
          </div>
        </div>

        {/* Table / List Container */}
        <div className="overflow-x-auto rounded-2xl border border-brand-200 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-brand-100 text-sm">
            <thead className="bg-brand-50 text-brand-800">
              <tr>
                <th className="px-4 py-3.5 text-left font-semibold">Student</th>
                <th className="px-4 py-3.5 text-left font-semibold">Email</th>
                <th className="px-4 py-3.5 text-left font-semibold">Requested Classroom</th>
                <th className="px-4 py-3.5 text-left font-semibold">University</th>
                <th className="px-4 py-3.5 text-left font-semibold">Classroom Owner</th>
                <th className="px-4 py-3.5 text-left font-semibold">Requested At</th>
                <th className="px-4 py-3.5 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-ink-400">
                    <Loader2 className="w-7 h-7 animate-spin mx-auto text-brand-500 mb-2" />
                    Loading pending requests...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-ink-400">
                    <div className="flex flex-col items-center justify-center">
                      <UserCheck className="w-12 h-12 text-brand-300 mb-2" />
                      <p className="text-base font-semibold text-ink-700">All caught up!</p>
                      <p className="text-sm text-ink-400">No pending student join requests found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r, idx) => {
                  const key = `${r.classroomId}-${r.studentId}`;
                  const isProcessing = processingId === key;
                  return (
                    <tr
                      key={key}
                      className={`transition-colors duration-150 ${
                        idx % 2 === 0 ? "bg-white" : "bg-brand-50/30"
                      } hover:bg-brand-50`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <AvatarComponent
                            fullName={r.studentName}
                            profilePicture={r.studentProfilePicture || "?"}
                          />
                          <span className="font-semibold text-ink-900">{r.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-ink-600 font-mono text-xs">
                        {r.studentEmail}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-brand-900">{r.classroomName}</div>
                        <div className="text-xs font-mono text-ink-400">Code: {r.classroomCode}</div>
                      </td>
                      <td className="px-4 py-3.5 text-ink-600 text-xs">
                        <div>{r.university}</div>
                        <div className="text-ink-400">{r.faculty}</div>
                      </td>
                      <td className="px-4 py-3.5 text-ink-700">
                        {r.ownerName}
                      </td>
                      <td className="px-4 py-3.5 text-ink-500 text-xs whitespace-nowrap">
                        {formatDate(r.requestedAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            disabled={isProcessing}
                            onClick={() =>
                              handleAction(r.classroomId, r.studentId, "accept", r.studentName)
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5 text-xs font-semibold"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Accept
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={isProcessing}
                            onClick={() =>
                              handleAction(r.classroomId, r.studentId, "reject", r.studentName)
                            }
                            className="h-8 px-2.5 text-xs font-semibold"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRequest(r)}
                            className="text-ink-500 hover:text-ink-800 h-8 px-2"
                            title="View Info"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* View Details Modal */}
        {selectedRequest && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRequest(null)}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-brand-600" />
                Join Request Details
              </h2>
              <div className="space-y-3.5 text-sm text-ink-700">
                <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
                  <AvatarComponent
                    fullName={selectedRequest.studentName}
                    profilePicture={selectedRequest.studentProfilePicture || "?"}
                  />
                  <div>
                    <h3 className="font-bold text-ink-900">{selectedRequest.studentName}</h3>
                    <p className="text-xs text-ink-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {selectedRequest.studentEmail}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-brand-100">
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Classroom</strong>
                    <span className="font-semibold text-ink-900">{selectedRequest.classroomName}</span>
                  </div>
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Classroom Code</strong>
                    <span className="font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded text-xs">
                      {selectedRequest.classroomCode}
                    </span>
                  </div>
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">University & Faculty</strong>
                    <span>{selectedRequest.university} ({selectedRequest.faculty})</span>
                  </div>
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Classroom Creator</strong>
                    <span>{selectedRequest.ownerName}</span>
                  </div>
                  <div>
                    <strong className="text-ink-500 text-xs uppercase block">Request Timestamp</strong>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ink-400" /> {formatDate(selectedRequest.requestedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleAction(
                      selectedRequest.classroomId,
                      selectedRequest.studentId,
                      "reject",
                      selectedRequest.studentName
                    )
                  }
                >
                  Reject
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() =>
                    handleAction(
                      selectedRequest.classroomId,
                      selectedRequest.studentId,
                      "accept",
                      selectedRequest.studentName
                    )
                  }
                >
                  Approve Admission
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingClassroomAdmin;
