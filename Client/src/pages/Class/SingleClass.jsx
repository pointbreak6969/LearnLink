import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import classroomService from "@/services/classroom";
import StreamTab from "./StreamTab";
import ResourcesTab from "./ResourcesTab";
import PeopleTab from "./PeopleTab";
import { Settings } from "lucide-react";
import Setting from "./Setting";
import AdminControls from "@/components/AdminControls";
import { useSelector } from "react-redux";
const SingleClass = () => {
  const classroomId = useParams();
  const [loading, isLoading] = useState(false);
  const [classroomDetails, setClassroomDetails] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stream");
  const [owner,setOwner]=useState('')
  const user=useSelector((state)=>state.auth?.userData?._id)
 
 
  

  useEffect(() => {
    async function fetchClassDetails() {
      try {
        isLoading(true);
        setError("");
        const response = await classroomService.getClassroomDetails({
          classroomId: classroomId?.classCode,
        });
        if (response) {
          setClassroomDetails(response);
          setOwner(response.admin)

        } else {
          setError("Error while fetching Classroom Details");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        isLoading(false);
      }
    }
    fetchClassDetails();
  }, [classroomId?.classCode]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-brand-50/40">
      <header className="bg-white border-b border-ink-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
            {classroomDetails.name}
          </h1>
          <p className="text-base text-ink-500 mt-1">
            {classroomDetails.faculty}, {classroomDetails.university}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex justify-between bg-white border border-ink-100 rounded-xl p-1.5 shadow-card h-auto">
              <div className="flex gap-1">
                <TabsTrigger
                  value="stream"
                  className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50"
                >
                  Stream
                </TabsTrigger>
                <TabsTrigger
                  value="classwork"
                  className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="people"
                  className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50"
                >
                  People
                </TabsTrigger>
              </div>
              <div className="ml-auto">
                 {user===owner?
                  <TabsTrigger
                    value="setting"
                    className="text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-brand-500 data-[state=active]:text-white hover:bg-brand-50"
                  >
                    <Settings className="h-4 w-4" />
                  </TabsTrigger>:<></>}
              </div>{" "}
            </TabsList>

            <TabsContent value="stream">
              <StreamTab classroomId={classroomId} />
            </TabsContent>

            <TabsContent value="classwork">
              <ResourcesTab classroomId={classroomId.classCode} />
            </TabsContent>

            <TabsContent value="people">
              <PeopleTab owner={owner}/>
            </TabsContent>
            <TabsContent value="setting">
              {/* <AdminControls adminId={classroomDetails.admin}>
                <Setting
                  classroomId={classroomId.classCode}
                  code={classroomDetails.code}
                  name={classroomDetails.name}
                  university={classroomDetails.university}
                  faculty={classroomDetails.faculty}
                />
              </AdminControls> */}
               <Setting
                  classroomId={classroomId.classCode}
                  code={classroomDetails.code}
                  name={classroomDetails.name}
                  university={classroomDetails.university}
                  faculty={classroomDetails.faculty}
                />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {error && (
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SingleClass;
