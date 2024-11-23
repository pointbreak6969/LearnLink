import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import classroomService from "@/services/classroom";
import StreamTab from "./StreamTab";
import ResourcesTab from "./ResourcesTab";
import PeopleTab from "./PeopleTab";

const SingleClass = () => {
  const classroomId = useParams();
  const [loading, isLoading] = useState(false);
  const [classroomDetails, setClassroomDetails] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stream");
  
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      user: "Ashim Gautam",
      content: "Dear Students, Please find the class note for your reference.",
      date: "29 Sept",
      attachment: {
        name: "english_class_note.pdf",
        type: "PDF",
      },
    },
    {
      id: "2",
      user: "Ram poudel",
      content: "Dear Students, Please find the class note for your reference.",
      date: "2 Sept",
      attachment: {
        name: "physics_class_note.pdf",
        type: "PDF",
      },
    },
  ]);
  
  const [resources, setResources] = useState([
    { id: "1", name: "Course Syllabus", type: "PDF" },
    { id: "2", name: "Week 1 Lecture Slides", type: "PPTX" },
    { id: "3", name: "Assignment 1 Guidelines", type: "DOCX" },
  ]);

  const [joinRequests, setJoinRequests] = useState([
    { id: 1, name: "Ram poudel" },
    { id: 2, name: "Hari Sharma" },
    { id: 3, name: "Ganga Poudel" },
  ]);

  const [studentsInClassroom, setStudentsInClassroom] = useState([
    { id: 1, name: "Nischal regmi" },
    { id: 2, name: "Ramit Kc" },
  ]);

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
      {/* Header */}
      <header className="border-b shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-black">
            {classroomDetails.faculty}
          </h1>
          <p className="text-lg text-gray-800">{classroomDetails.university}</p>
        </div>
      </header>

      {/* Banner */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="border-b border-gray-300">
              <TabsTrigger
                value="stream"
                className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                Stream
              </TabsTrigger>
              <TabsTrigger
                value="classwork"
                className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="people"
                className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                People
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stream">
              <StreamTab announcements={announcements} />
            </TabsContent>

            <TabsContent value="classwork">
              <ResourcesTab resources={resources} />
            </TabsContent>

            <TabsContent value="people">
              <PeopleTab
                studentsInClassroom={studentsInClassroom}
                joinRequests={joinRequests}
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