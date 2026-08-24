import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import classroomService from "@/services/classroom";
import AvatarComponent from "@/components/AvatarComponent";
import { useSelector } from "react-redux";
import { toast } from "sonner";
const UserSkeleton = () => (
  <div className="flex items-center gap-3 p-1">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-4 w-32" />
  </div>
);

const PeopleTab = ({ owner}) => {
  const user=useSelector((state)=>state.auth.userData._id)
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { classCode } = useParams();
  const classroomId = classCode;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({});
  const [joinRequests,setJoinRequests]=useState([])
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await classroomService.getClassroomUsers(classroomId);
      if (response) {
        setUsers(response[0].results);
        setAdmin(response[0].admin);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [classroomId]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getRequestedUsers=async()=>{
    const resposne=await classroomService.getJoinRequest({id:classroomId})
    setJoinRequests(resposne.data);
  }
 useEffect(()=>{
  getRequestedUsers()
 },[])

  const handleAccept =async (userId) => {
      const resposne=await classroomService.userRequestToadmin({id:classroomId,status:"accept",userId})
      if(resposne){
        toast.success("user registed in classRoom")
      }else{
        toast.error("user failed to join classroom")
      }
      setDialogOpen(false)
    };

  const handleReject =async  (userId) => {
    const resposne=await classroomService.userRequestToadmin({id:classroomId,status:"reject",userId})
    if(resposne){
      toast.success("user rejected to join classRoom")
    }else{
      toast.error("user is failed  to reject in classroom")
    }
    setDialogOpen(false)
  };

  if (error) {
    return (
      <Card className="animate-fade-in shadow-lg rounded-lg">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-ink-800">
          People
        </CardTitle>
      </CardHeader>
      <CardContent>
        {user===owner ?
          <div className="flex justify-end mb-4">
          <Button
            onClick={()=>setDialogOpen(true)}
            variant="outline"
            className="relative"
          >
            Join Requests
            {joinRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {joinRequests.length}
              </span>
            )}
          </Button>
        </div>:<></>}

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-400 flex items-center gap-2 mb-3">
              <FaChalkboardTeacher className="text-brand-500" /> Admin
            </p>
            <ul className="space-y-3 text-ink-700 font-medium">
              {loading ? (
                <UserSkeleton />
              ) : admin && admin.fullName ? (
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full">
                    <AvatarComponent
                      profilePicture={
                        admin?.profileDetails?.profilePicture?.url || "?"
                      }
                      fullName={admin.fullName}
                    />
                  </div>
                  <span className="text-sm font-medium text-ink-900">
                    {admin.fullName}
                  </span>
                </li>
              ) : (
                <UserSkeleton />
              )}
            </ul>
          </div>

          <div className="pt-4 border-t border-ink-100">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-400 flex items-center gap-2 mb-3">
              <FaUserGraduate className="text-brand-500" /> Classmates
            </p>
            <ul className="space-y-4">
              {loading ? (
                <>
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                </>
              ) : (
                users.map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center gap-3 p-1 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full">
                      <AvatarComponent
                        profilePicture={
                          user.profileDetails?.profilePicture?.url || "?"
                        } fullName={user.fullName}
                      />
                    </div>
                    <span className="text-sm font-medium text-ink-900">
                      {user.fullName}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger />
          <DialogContent className="w-full max-w-lg p-6">
            <DialogTitle className="text-lg font-bold text-ink-800">
              Join Requests
            </DialogTitle>
            <DialogDescription className="mt-4 text-ink-600">
              <ul className="space-y-4">
                {joinRequests.length === 0 ? (
                  <li className="text-sm text-ink-400">
                    No users are requesting to join at the moment.
                  </li>
                ) : (
                  joinRequests.map((user) => (
                    <li
                      key={user._id}
                      className="flex justify-between items-center border-b border-ink-100 pb-2"
                    >
                      <span className="text-sm font-medium text-ink-900">
                        {user.fullName}
                      </span>
                      <div className="space-x-2">
                        <Button
                          onClick={() => handleAccept(user._id)}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(user._id)}
                          size="sm"
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PeopleTab;
