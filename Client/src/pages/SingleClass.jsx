import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, FileText, Upload, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import classroomService from "@/services/classroom";
import { useParams } from "react-router-dom";

const SingleClass = () => {
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);
  const classroomId = useParams();
  const [loading, isLoading] = useState(false);
  const [classroomDetails, setClassroomDetails] = useState({});
  const [error, setError] = useState("");
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    file: null,
  });
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

  // users to join classroom
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [joinRequests, setJoinRequests] = useState([
    { id: 1, name: "Ram poudel" },
    { id: 2, name: "Hari Sharma" },
    { id: 3, name: "Ganga Poudel" },
  ]);
  const [studentsInClassroom, setStudentsInClassroom] = useState([
    { id: 1, name: "Nischal regmi" },
    { id: 2, name: "Ramit Kc" },
  ]);
  const handleAccept = (id) => {
    setJoinRequests((prevRequests) =>
      prevRequests.filter((user) => user.id !== id)
    );
    console.log(`User ${id} accepted`);
  };

  const handleReject = (id) => {
    setJoinRequests((prevRequests) =>
      prevRequests.filter((user) => user.id !== id)
    );
    console.log(`User ${id} rejected`);
  };

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
  }, []);
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
  };

  const handleAddResource = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {" "}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="border-b shadow-md">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-4xl font-bold text-black">
                {classroomDetails.faculty}
              </h1>
              <p className="text-lg text-gray-800">
                {classroomDetails.university}
              </p>
            </div>
          </header>

          {/* Banner */}
          <div className="bg-gradient-to-b from-orange-50 to-orange-100 text-white py-8">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl text-black font-semibold">
                Welcome to Your Class!
              </h2>
              <p className="mt-2 text-lg text-gray-900">
                Stay updated with announcements and resources.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64"></aside>
            <div className="flex-1">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
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

                {/* Tab Content Sections */}
                <TabsContent value="stream">
                  {/* Announcement Input */}
                  <Card className="mb-6 shadow-lg rounded-lg">
                    <CardContent className="pt-6">
                      <form onSubmit={handlePostAnnouncement}>
                        <div className="flex flex-col md:flex-row items-center space-x-4 mb-4">
                          <Avatar className="mb-2 md:mb-0">
                            <AvatarImage
                              src="/placeholder.svg?height=40&width=40"
                              alt="User"
                            />
                            <AvatarFallback>UN</AvatarFallback>
                          </Avatar>
                          <Textarea
                            placeholder="Announce something to your class"
                            className="flex-1 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg"
                          >
                            Post
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Announcements */}
                  {announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="mb-6 shadow-lg rounded-lg"
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt={announcement.user}
                              />
                              <AvatarFallback>
                                {announcement.user[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-[#FF9500]">
                                {announcement.user}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {announcement.date}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-200"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="mb-4">{announcement.content}</p>
                        {announcement.attachment && (
                          <Card className="bg-gray-100 rounded-lg">
                            <CardContent className="p-4 flex items-center space-x-4">
                              <div className="bg-gray-200 p-2 rounded">
                                <FileText className="h-8 w-8 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {announcement.attachment.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {announcement.attachment.type}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="classwork">
                  <Card className="animate-fade-in shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Resources</span>

                        <Dialog
                          open={isAddResourceDialogOpen}
                          onOpenChange={setIsAddResourceDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button varient="default">
                              <Upload className="mr-2" />
                              Upload
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add New Resource</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                  Title
                                </Label>
                                <Input id="title" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id="description"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                  File
                                </Label>
                                <Input
                                  id="file"
                                  type="file"
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Add Resource</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddResource} className="mb-4">
                        <div className="flex flex-col md:flex-row items-center space-x-2">
                          <Input
                            placeholder="Resource name to find"
                            className="flex-1 border border-gray-300 rounded-lg mb-2 md:mb-0"
                          />
                        </div>
                      </form>
                      <ul className="space-y-2">
                        {resources.map((resource) => (
                          <li
                            key={resource.id}
                            className="flex items-center justify-between border-b py-2 animate-fade-in"
                          >
                            <span className="text-gray-800">
                              {resource.name} ({resource.type})
                            </span>
                            <div className="flex gap-2 items-center">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#FF9500] flex items-center hover:underline"
                                aria-label={`Save ${resource.name}`}
                              >
                                <Save className="h-5 w-5 text-[#FF9500] mr-1" />
                                Save
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#FF9500] hover:underline"
                                aria-label={`View ${resource.name}`}
                              >
                                View
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="people">
  <Card className="animate-fade-in shadow-lg rounded-lg">
    <CardHeader>
      <CardTitle>People</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">
        List of students will go here.
      </p>
      <div className="flex justify-end mb-1">
        <Button onClick={() => setDialogOpen(true)} className="relative">
          Join Requests
          {joinRequests.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {joinRequests.length}
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 -mt-10">
        <div>
          <ul className="space-y-4">
            {studentsInClassroom.map((user) => (
              <li
                key={user.id}
                className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="text-lg font-medium text-gray-900 flex-grow">
                  {user.name}
                </span>
                <div className="ml-4"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Join Requests Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent className="w-full max-w-lg p-6">
          <DialogTitle>Join Requests</DialogTitle>
          <DialogDescription>
            <ul className="space-y-4">
              {joinRequests.length === 0 ? (
                <li>No users are requesting to join at the moment.</li>
              ) : (
                joinRequests.map((user) => (
                  <li key={user.id} className="flex justify-between items-center">
                    <span>{user.name}</span>
                    <div className="space-x-2">
                      <Button
                        onClick={() => handleAccept(user.id)}
                        className="bg-green-500 text-white"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(user.id)}
                        className="bg-red-500 text-white"
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
</TabsContent>

              </Tabs>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default SingleClass;
