import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import classroomService from "@/services/classroom";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from "@/components/CreateClassroom";
import { Shield, ShieldAlert, Trash2, LogOut, UserPlus, Loader2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AvatarComponent from "@/components/AvatarComponent";

const Setting = ({
  code,
  name,
  faculty,
  university,
  classroomId,
  isCreator,
  isSuperAdmin,
  canDeleteClassroom,
  onClassroomUpdated,
}) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [coAdmins, setCoAdmins] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedMemberToAdd, setSelectedMemberToAdd] = useState("");

  // Confirmation Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      newUniversityName: university || "",
      newFacultyName: faculty || "",
      newClassroomName: name || "",
    },
  });

  useEffect(() => {
    reset({
      newUniversityName: university || "",
      newFacultyName: faculty || "",
      newClassroomName: name || "",
    });
  }, [name, faculty, university, reset]);

  const loadClassroomUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const data = await classroomService.getClassroomUsers(classroomId);
      if (data && data[0]) {
        setUsersList(data[0].results || []);
        setCoAdmins(data[0].coAdmins || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  }, [classroomId]);

  useEffect(() => {
    loadClassroomUsers();
  }, [loadClassroomUsers]);

  const onSubmit = async (formData) => {
    try {
      setIsUpdating(true);
      await classroomService.updateClasroomDetails(classroomId, formData);
      toast.success("Classroom details updated successfully");
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (error) {
      toast.error(error.message || "Failed to update classroom details");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddCoAdmin = async () => {
    if (!selectedMemberToAdd) return;
    try {
      setActionLoading(true);
      await classroomService.addCoAdmin({
        classroomId,
        userId: selectedMemberToAdd,
      });
      toast.success("Co-admin assigned successfully");
      setSelectedMemberToAdd("");
      loadClassroomUsers();
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (err) {
      toast.error(err.message || "Failed to assign co-admin");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveCoAdmin = async (userId, memberName) => {
    try {
      setActionLoading(true);
      await classroomService.removeCoAdmin({ classroomId, userId });
      toast.success(`Removed ${memberName} from co-admins`);
      loadClassroomUsers();
      if (onClassroomUpdated) onClassroomUpdated();
    } catch (err) {
      toast.error(err.message || "Failed to remove co-admin");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClassroom = async () => {
    try {
      setActionLoading(true);
      await classroomService.deleteClassroom(classroomId);
      toast.success("Classroom deleted successfully");
      navigate("/classroom");
    } catch (err) {
      toast.error(err.message || "Failed to delete classroom");
    } finally {
      setActionLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleLeaveClassroom = async () => {
    try {
      setActionLoading(true);
      await classroomService.leaveClassroom(classroomId);
      toast.success("You have left the classroom");
      navigate("/classroom");
    } catch (err) {
      toast.error(err.message || "Failed to leave classroom");
    } finally {
      setActionLoading(false);
      setShowLeaveModal(false);
    }
  };

  const nonAdminMembers = usersList.filter(
    (u) => !coAdmins.some((adm) => (adm._id || adm) === u._id)
  );

  return (
    <div className="space-y-6 mb-12">
      {/* Edit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 md:p-8 border border-brand-200 rounded-2xl shadow-sm bg-white"
      >
        <h2 className="text-xl font-bold mb-5 text-ink-900 flex items-center gap-2">
          Update Class Details
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="university"
              className="block text-xs font-semibold uppercase text-ink-700 mb-1"
            >
              University
            </label>
            <Controller
              name="newUniversityName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-10 border-brand-300">
                    <SelectValue placeholder="Select your University" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[220px] overflow-y-auto">
                    <SelectGroup>
                      {universities.map((uni) => (
                        <SelectItem key={uni.value} value={uni.label}>
                          {uni.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label
              htmlFor="newFacultyName"
              className="block text-xs font-semibold uppercase text-ink-700 mb-1"
            >
              Faculty
            </label>
            <Input
              id="newFacultyName"
              type="text"
              {...register("newFacultyName")}
              placeholder="Enter Faculty"
              className="border-brand-300"
            />
          </div>
          <div>
            <label
              htmlFor="newClassroomName"
              className="block text-xs font-semibold uppercase text-ink-700 mb-1"
            >
              Classroom / Course Name
            </label>
            <Input
              id="newClassroomName"
              type="text"
              {...register("newClassroomName")}
              placeholder="Enter course name"
              className="border-brand-300"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isUpdating}
            className="bg-brand-600 hover:bg-brand-700 text-white"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>

      {/* Classroom Co-Admins Management (Creator / SuperAdmin) */}
      {(isCreator || isSuperAdmin) && (
        <div className="p-6 md:p-8 border border-brand-200 rounded-2xl shadow-sm bg-white space-y-5">
          <div>
            <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-600" />
              Manage Classroom Co-Admins
            </h2>
            <p className="text-xs text-ink-500 mt-1">
              Co-Admins can update classroom settings, approve student requests, and moderate class resources.
            </p>
          </div>

          {/* Current Co-Admins List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-500">
              Active Co-Admins ({coAdmins.length})
            </h3>
            {loadingUsers ? (
              <div className="text-sm text-ink-400 py-3">Loading admins...</div>
            ) : coAdmins.length === 0 ? (
              <p className="text-sm text-ink-400 italic">
                No co-admins assigned yet. You can promote members from the class below.
              </p>
            ) : (
              <div className="space-y-2">
                {coAdmins.map((adm) => (
                  <div
                    key={adm._id}
                    className="flex items-center justify-between p-3 bg-brand-50/60 rounded-xl border border-brand-100"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarComponent fullName={adm.fullName} profilePicture="?" />
                      <div>
                        <div className="font-semibold text-sm text-ink-900">{adm.fullName}</div>
                        <div className="text-xs text-ink-500">{adm.email}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={actionLoading}
                      onClick={() => handleRemoveCoAdmin(adm._id, adm.fullName)}
                      className="text-red-600 hover:bg-red-50 border-red-200 h-8 text-xs"
                    >
                      Remove Co-Admin
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assign New Co-Admin */}
          <div className="pt-4 border-t border-brand-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-500 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-brand-600" />
              Assign Co-Admin From Classmates
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                className="w-full sm:w-80 px-3.5 py-2 text-sm rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-ink-800"
                value={selectedMemberToAdd}
                onChange={(e) => setSelectedMemberToAdd(e.target.value)}
              >
                <option value="">-- Select an enrolled student --</option>
                {nonAdminMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullName} ({member.email})
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleAddCoAdmin}
                disabled={!selectedMemberToAdd || actionLoading}
                className="bg-brand-600 hover:bg-brand-700 text-white w-full sm:w-auto text-xs font-semibold h-9"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <Shield className="w-4 h-4 mr-1.5" />
                )}
                Promote to Co-Admin
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* General Information Card */}
      <div className="p-6 md:p-8 border border-brand-200 rounded-2xl shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4 text-ink-900">Classroom Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-brand-50/50 rounded-xl">
            <strong className="text-xs text-ink-500 uppercase block">Course Name</strong>
            <p className="text-ink-900 font-semibold mt-0.5">{name}</p>
          </div>
          <div className="p-3 bg-brand-50/50 rounded-xl">
            <strong className="text-xs text-ink-500 uppercase block">Class Code</strong>
            <p className="text-brand-800 font-mono font-bold mt-0.5">{code}</p>
          </div>
          <div className="p-3 bg-brand-50/50 rounded-xl">
            <strong className="text-xs text-ink-500 uppercase block">University</strong>
            <p className="text-ink-900 mt-0.5">{university}</p>
          </div>
          <div className="p-3 bg-brand-50/50 rounded-xl">
            <strong className="text-xs text-ink-500 uppercase block">Faculty</strong>
            <p className="text-ink-900 mt-0.5">{faculty}</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 md:p-8 border border-red-200 rounded-2xl shadow-sm bg-red-50/30 space-y-4">
        <div className="flex items-center gap-2 text-red-700">
          <ShieldAlert className="w-6 h-6" />
          <h2 className="text-xl font-bold">Danger Zone</h2>
        </div>

        {canDeleteClassroom ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-200">
            <div>
              <h3 className="font-bold text-red-900 text-sm">Delete this Classroom</h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Permanently delete this classroom, all posted resources, and student memberships.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="text-xs font-semibold"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete Classroom
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-200">
            <div>
              <h3 className="font-bold text-red-900 text-sm">Leave Classroom</h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Remove yourself from this classroom roster and stop receiving updates.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowLeaveModal(true)}
              className="text-xs font-semibold"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Leave Classroom
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-red-600 mb-2">Confirm Classroom Deletion</h2>
            <p className="text-sm text-ink-600 mb-4 leading-relaxed">
              Are you sure you want to permanently delete <strong>{name}</strong>? All files, posts, and student access will be deleted immediately.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteClassroom}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                  </>
                ) : (
                  "Delete Permanently"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Confirmation Modal */}
      {showLeaveModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4"
          onClick={() => setShowLeaveModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-red-600 mb-2">Leave Classroom</h2>
            <p className="text-sm text-ink-600 mb-4 leading-relaxed">
              Are you sure you want to leave <strong>{name}</strong>? You will need to enter the class code or request to join again to regain access.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLeaveModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLeaveClassroom}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Leaving...
                  </>
                ) : (
                  "Confirm Leave"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
