import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import {
  Shield,
  MoreVertical,
  UserMinus,
  CheckCircle,
  XCircle,
  Users,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import classroomService from "@/services/classroom";
import AvatarComponent from "@/components/AvatarComponent";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const UserSkeleton = () => (
  <div className="flex items-center gap-3 p-2">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
);

const PeopleTab = ({
  classroomId,
  isCreator,
  isCoAdmin,
  isSuperAdmin,
  canManageClassroom,
  onClassroomUpdated,
}) => {
  const currentUserId = useSelector((state) => state.auth?.userData?._id);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({});
  const [coAdmins, setCoAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [actionInProgress, setActionInProgress] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await classroomService.getClassroomUsers(classroomId);
      if (response && response[0]) {
        setAdmin(response[0].admin || {});
        setCoAdmins(response[0].coAdmins || []);
        setStudents(response[0].results || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [classroomId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getRequestedUsers = useCallback(async () => {
    if (!canManageClassroom) return;
    try {
      const response = await classroomService.getJoinRequest({ id: classroomId });
      setJoinRequests(response.data || []);
    } catch (err) {
      console.error("Error fetching join requests:", err);
    }
  }, [classroomId, canManageClassroom]);

  useEffect(() => {
    getRequestedUsers();
  }, [getRequestedUsers]);

  const handleAccept = async (userId, studentName) => {
    try {
      setActionInProgress(userId);
      const res = await classroomService.userRequestToadmin({
        id: classroomId,
        status: "accept",
        userId,
      });
      if (res) {
        toast.success(`${studentName || "Student"} added to classroom`);
        setJoinRequests((prev) => prev.filter((u) => u._id !== userId));
        fetchUsers();
        if (onClassroomUpdated) onClassroomUpdated();
      }
    } catch (err) {
      toast.error(err.message || "Failed to accept user");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (userId, studentName) => {
    try {
      setActionInProgress(userId);
      const res = await classroomService.userRequestToadmin({
        id: classroomId,
        status: "reject",
        userId,
      });
      if (res) {
        toast.info(`Request for ${studentName || "student"} rejected`);
        setJoinRequests((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (err) {
      toast.error(err.message || "Failed to reject request");
    } finally {
      setActionInProgress(null);
    }
  };

  const handlePromoteToCoAdmin = async (userId, studentName) => {
    try {
      setActionInProgress(userId);
      await classroomService.addCoAdmin({ classroomId, userId });
      toast.success(`${studentName} promoted to Co-Admin`);
      fetchUsers();
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (err) {
      toast.error(err.message || "Failed to promote student");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRemoveCoAdmin = async (userId, memberName) => {
    try {
      setActionInProgress(userId);
      await classroomService.removeCoAdmin({ classroomId, userId });
      toast.success(`Removed ${memberName} from Co-Admins`);
      fetchUsers();
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (err) {
      toast.error(err.message || "Failed to remove co-admin");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRemoveMember = async (userId, memberName) => {
    try {
      setActionInProgress(userId);
      await classroomService.removeMember({ classroomId, userId });
      toast.success(`Removed ${memberName} from classroom`);
      fetchUsers();
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (err) {
      toast.error(err.message || "Failed to remove student");
    } finally {
      setActionInProgress(null);
    }
  };

  // Filter out creator from students list if duplicate
  const actualStudents = students.filter(
    (s) => s._id?.toString() !== admin._id?.toString()
  );

  if (error) {
    return (
      <Card className="shadow-xs border-brand-200">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-brand-200">
      <CardHeader className="pb-4 border-b border-brand-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            Class Members
          </CardTitle>
        </div>
        {canManageClassroom && (
          <Button
            onClick={() => {
              getRequestedUsers();
              setDialogOpen(true);
            }}
            variant="outline"
            size="sm"
            className="relative border-brand-300 hover:bg-brand-50 text-brand-800"
          >
            Join Requests
            {joinRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-amber-500 rounded-full shadow-xs">
                {joinRequests.length}
              </span>
            )}
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-6 space-y-8">
        {/* Tier 1: Classroom Creator / Primary Teacher */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5 mb-3">
            <FaChalkboardTeacher className="text-brand-600 text-sm" /> Classroom Creator & Teacher
          </p>
          <ul className="space-y-3 text-ink-700">
            {loading ? (
              <UserSkeleton />
            ) : admin && admin.fullName ? (
              <li className="flex items-center justify-between p-3 bg-brand-50/50 rounded-xl border border-brand-100">
                <div className="flex items-center gap-3">
                  <AvatarComponent
                    profilePicture={admin.profileDetails?.profilePicture?.url || "?"}
                    fullName={admin.fullName}
                  />
                  <div>
                    <span className="text-sm font-bold text-ink-900 block">
                      {admin.fullName}
                    </span>
                    <span className="text-xs text-ink-500">{admin.email}</span>
                  </div>
                </div>
                <span className="text-xs bg-brand-100 text-brand-800 font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
                  Creator
                </span>
              </li>
            ) : (
              <UserSkeleton />
            )}
          </ul>
        </div>

        {/* Tier 2: Classroom Co-Admins */}
        {coAdmins && coAdmins.length > 0 && (
          <div className="pt-4 border-t border-brand-100">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5 mb-3">
              <Shield className="text-purple-600 text-sm" /> Classroom Co-Admins ({coAdmins.length})
            </p>
            <ul className="space-y-2.5">
              {coAdmins.map((adm) => (
                <li
                  key={adm._id}
                  className="flex items-center justify-between p-3 bg-purple-50/30 rounded-xl border border-purple-100 hover:bg-purple-50/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <AvatarComponent
                      profilePicture="?"
                      fullName={adm.fullName}
                    />
                    <div>
                      <span className="text-sm font-semibold text-ink-900 block">
                        {adm.fullName}
                      </span>
                      <span className="text-xs text-ink-500">{adm.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                      Co-Admin
                    </span>
                    {(isCreator || isSuperAdmin) && adm._id !== currentUserId && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-ink-500">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleRemoveCoAdmin(adm._id, adm.fullName)}
                            className="text-red-600 focus:bg-red-50 text-xs"
                          >
                            <UserMinus className="w-3.5 h-3.5 mr-2" />
                            Remove from Co-Admins
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tier 3: Classmates / Enrolled Students */}
        <div className="pt-4 border-t border-brand-100">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-500 flex items-center gap-1.5 mb-3">
            <FaUserGraduate className="text-brand-500 text-sm" /> Classmates ({actualStudents.length})
          </p>
          <ul className="space-y-2">
            {loading ? (
              <>
                <UserSkeleton />
                <UserSkeleton />
              </>
            ) : actualStudents.length === 0 ? (
              <li className="text-sm text-ink-400 py-4 text-center">
                No students enrolled in this classroom yet.
              </li>
            ) : (
              actualStudents.map((st) => {
                const isUserCoAdmin = coAdmins.some(
                  (a) => (a._id || a) === st._id
                );
                return (
                  <li
                    key={st._id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 transition border border-transparent hover:border-brand-100"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarComponent
                        profilePicture={st.profileDetails?.profilePicture?.url || "?"}
                        fullName={st.fullName}
                      />
                      <div>
                        <span className="text-sm font-medium text-ink-900 block">
                          {st.fullName}
                        </span>
                        <span className="text-xs text-ink-400">{st.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isUserCoAdmin && (
                        <span className="text-[11px] bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">
                          Co-Admin
                        </span>
                      )}

                      {canManageClassroom && st._id !== currentUserId && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-ink-400 hover:text-ink-700">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {(isCreator || isSuperAdmin) && !isUserCoAdmin && (
                              <DropdownMenuItem
                                onClick={() => handlePromoteToCoAdmin(st._id, st.fullName)}
                                className="text-purple-700 focus:bg-purple-50 text-xs font-medium"
                              >
                                <Shield className="w-3.5 h-3.5 mr-2" />
                                Promote to Co-Admin
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleRemoveMember(st._id, st.fullName)}
                              className="text-red-600 focus:bg-red-50 text-xs font-medium"
                            >
                              <UserMinus className="w-3.5 h-3.5 mr-2" />
                              Remove from Classroom
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Join Requests Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="w-full max-w-lg p-6">
            <DialogTitle className="text-lg font-bold text-ink-900 flex items-center justify-between">
              <span>Pending Join Requests</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                {joinRequests.length} pending
              </span>
            </DialogTitle>
            <DialogDescription className="mt-2 text-ink-600">
              Students requesting admission into this classroom.
            </DialogDescription>

            <ul className="space-y-3 mt-4 max-h-80 overflow-y-auto pr-1">
              {joinRequests.length === 0 ? (
                <li className="text-sm text-ink-400 py-6 text-center">
                  No pending join requests at the moment.
                </li>
              ) : (
                joinRequests.map((st) => (
                  <li
                    key={st._id}
                    className="flex justify-between items-center p-3 bg-brand-50/50 rounded-xl border border-brand-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <AvatarComponent
                        fullName={st.fullName}
                        profilePicture={st.profilePicture || "?"}
                      />
                      <div>
                        <span className="text-sm font-semibold text-ink-900 block">
                          {st.fullName}
                        </span>
                        <span className="text-xs text-ink-400">{st.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleAccept(st._id, st.fullName)}
                        size="sm"
                        disabled={actionInProgress === st._id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5 text-xs font-semibold"
                      >
                        {actionInProgress === st._id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Accept
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleReject(st._id, st.fullName)}
                        size="sm"
                        variant="destructive"
                        disabled={actionInProgress === st._id}
                        className="h-8 px-2.5 text-xs font-semibold"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PeopleTab;
