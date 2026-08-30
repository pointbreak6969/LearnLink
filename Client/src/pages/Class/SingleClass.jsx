import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import classroomService from "@/services/classroom";
import StreamTab from "./StreamTab";
import ResourcesTab from "./ResourcesTab";
import PeopleTab from "./PeopleTab";
import { Settings, Shield, GraduationCap, ArrowLeft, Loader2 } from "lucide-react";
import Setting from "./Setting";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const SingleClass = () => {
  const { classCode } = useParams();
  const [loading, setLoading] = useState(false);
  const [classroomDetails, setClassroomDetails] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stream");

  const loggedUser = useSelector((state) => state.auth?.userData);
  const userId = loggedUser?._id;
  const userRole = loggedUser?.role;

  const fetchClassDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await classroomService.getClassroomDetails({
        classroomId: classCode,
      });
      if (response) {
        setClassroomDetails(response);
      } else {
        setError("Error while fetching Classroom Details");
      }
    } catch (err) {
      setError(err.message || "Failed to load classroom");
    } finally {
      setLoading(false);
    }
  }, [classCode]);

  useEffect(() => {
    fetchClassDetails();
  }, [fetchClassDetails]);

  // Compute permissions
  const creatorId =
    classroomDetails?.admin?._id?.toString() ||
    classroomDetails?.admin?.toString() ||
    "";
  const coAdminIds = (classroomDetails?.admins || []).map((a) =>
    (a._id || a).toString()
  );

  const isCreator = Boolean(userId && creatorId === userId.toString());
  const isCoAdmin = Boolean(userId && coAdminIds.includes(userId.toString()));
  const isSuperAdmin = userRole === "superadmin";

  const canManageClassroom = isCreator || isCoAdmin || isSuperAdmin;
  const canDeleteClassroom = isCreator || isSuperAdmin;

  if (loading && !classroomDetails?.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50/40">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50/40 pb-16">
      {/* Super Admin Inspection Banner */}
      {isSuperAdmin && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-200" />
            <span>
              <strong>Super Admin Inspection Mode:</strong> You are viewing this classroom with full administrative privileges.
            </span>
          </div>
          <Link
            to="/admin/classroom"
            className="underline hover:text-amber-100 font-semibold transition"
          >
            ← Back to Classroom Admin
          </Link>
        </div>
      )}

      {/* Header Banner */}
      <header className="bg-white border-b border-ink-100 shadow-xs">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-ink-500 hover:text-ink-800 -ml-2">
                  <Link to={isSuperAdmin ? "/admin/classroom" : "/classroom"}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> {isSuperAdmin ? "Back to Admin Panel" : "Classrooms"}
                  </Link>
                </Button>
                {isCreator && (
                  <span className="text-xs bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full border border-brand-300">
                    Creator
                  </span>
                )}
                {isCoAdmin && !isCreator && (
                  <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-300 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Co-Admin
                  </span>
                )}
                {isSuperAdmin && (
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    Super Admin
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 flex items-center gap-2">
                <GraduationCap className="w-7 h-7 text-brand-600" />
                {classroomDetails.name}
              </h1>
              <p className="text-sm text-ink-500 mt-0.5">
                {classroomDetails.faculty} • {classroomDetails.university} • Code:{" "}
                <span className="font-mono bg-brand-50 text-brand-800 px-1.5 py-0.5 rounded border border-brand-200 font-semibold">
                  {classroomDetails.code}
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <main className="max-w-7xl mx-auto mt-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="flex justify-between bg-white border border-ink-100 rounded-xl p-1.5 shadow-xs h-auto">
            <div className="flex gap-1">
              <TabsTrigger
                value="stream"
                className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50 transition"
              >
                Stream
              </TabsTrigger>
              <TabsTrigger
                value="classwork"
                className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50 transition"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="people"
                className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50 transition"
              >
                People
              </TabsTrigger>
            </div>
            {canManageClassroom && (
              <div className="ml-auto">
                <TabsTrigger
                  value="setting"
                  className="text-sm font-medium py-2 px-3 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50 transition flex items-center gap-1.5"
                  title="Classroom Settings"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </div>
            )}
          </TabsList>

          <TabsContent value="stream">
            <StreamTab classroomId={{ classCode }} />
          </TabsContent>

          <TabsContent value="classwork">
            <ResourcesTab classroomId={classCode} />
          </TabsContent>

          <TabsContent value="people">
            <PeopleTab
              classroomId={classCode}
              isCreator={isCreator}
              isCoAdmin={isCoAdmin}
              isSuperAdmin={isSuperAdmin}
              canManageClassroom={canManageClassroom}
              onClassroomUpdated={fetchClassDetails}
            />
          </TabsContent>

          {canManageClassroom && (
            <TabsContent value="setting">
              <Setting
                classroomId={classCode}
                code={classroomDetails.code}
                name={classroomDetails.name}
                university={classroomDetails.university}
                faculty={classroomDetails.faculty}
                isCreator={isCreator}
                isSuperAdmin={isSuperAdmin}
                canDeleteClassroom={canDeleteClassroom}
                onClassroomUpdated={fetchClassDetails}
              />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {error && (
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleClass;
