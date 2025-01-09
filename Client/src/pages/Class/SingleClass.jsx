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
    <div className="min-h-screen bg-gray-50">
      <header className="border-b shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-black">
            {classroomDetails.name}
          </h1>
          <p className="text-lg text-gray-800">
            {classroomDetails.faculty}, {classroomDetails.university}
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-b from-orange-50 to-orange-100 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl text-black font-semibold">
            Welcome to Your Class!
          </h2>
          <p className="mt-2 text-lg text-gray-900">
            Stay updated with announcements and resources.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className=" flex justify-between">
              <div className="flex gap-4">
                <TabsTrigger
                  value="stream"
                  className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  Stream
                </TabsTrigger>
                <TabsTrigger
                  value="classwork"
                  className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="people"
                  className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  People
                </TabsTrigger>
              </div>
              <div className="ml-auto">
                {/* <AdminControls adminId={classroomDetails.admin}>
                  <TabsTrigger
                    value="setting"
                    className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200"
                  >
                    <Settings className="text-gray-900" />
                  </TabsTrigger>
                </AdminControls> */}
                 {user===owner?
                  <TabsTrigger
                    value="setting"
                    className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200"
                  >
                    <Settings className="text-gray-900" />
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
