import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const UserSkeleton = () => (
  <div className="flex items-center gap-3 p-1">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-4 w-32" />
  </div>
);

const PeopleTab = ({ studentsInClassroom = [], joinRequests = [] }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { classCode } = useParams();
  const classroomId = classCode;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({});
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await classroomService.getClassroomUsers(classroomId);
      if (response) {
        setUsers(response[0].results);
        setAdmin(response[0].admin)
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

  const handleAccept = (id) => {
    console.log(`User ${id} accepted`);
  };

  const handleReject = (id) => {
    console.log(`User ${id} rejected`);
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
    <Card className="animate-fade-in shadow-lg rounded-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          People
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setDialogOpen(true)}
            className="relative rounded-xl transition-all"
          >
            Join Requests
            {joinRequests.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {joinRequests.length}
              </span>
            )}
          </Button>
        </div>

        <div>
          <div className="p-6 bg-white rounded-lg -mt-10">
            <p className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaChalkboardTeacher className="text-blue-500" /> Admin
            </p>
            <ul className="space-y-3 mt-4 text-gray-700 font-medium">
            {loading ? (
              <UserSkeleton />
            ) : admin && admin.fullName ? (
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full">
                  <Avatar>
                    <AvatarImage
                      src={admin?.profileDetails?.profilePicture?.url || "?"}
                    />
                    <AvatarFallback>
                      {admin.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-sm font-medium text-gray-900">                     
                  {admin.fullName}
                </span>
              </li>
            ) : (
              <UserSkeleton />
            )}
          </ul>
          </div>

          <div className="p-6 bg-white rounded-lg">
            <p className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserGraduate className="text-purple-500" /> Classmates
            </p>
            <ul className="space-y-4 mt-4">
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
                      <Avatar>
                        <AvatarImage
                          src={user.profileDetails?.profilePicture?.url || "?"}
                        />
                        <AvatarFallback>
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
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
          <DialogContent className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <DialogTitle className="text-lg font-bold text-gray-800">
              Join Requests
            </DialogTitle>
            <DialogDescription className="mt-4 text-gray-600">
              <ul className="space-y-4">
                {joinRequests.length === 0 ? (
                  <li className="text-sm text-gray-500">
                    No users are requesting to join at the moment.
                  </li>
                ) : (
                  joinRequests.map((user) => (
                    <li
                      key={user.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {user.name}
                      </span>
                      <div className="space-x-2">
                        <Button
                          onClick={() => handleAccept(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
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
