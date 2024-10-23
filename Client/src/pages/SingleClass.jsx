import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MoreVertical, PlusCircle, FileText, Paperclip } from 'lucide-react';

const SingleClass = () => {
  const [activeTab, setActiveTab] = useState('stream');
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      user: 'Sandeep Gupta',
      content: 'Dear Students, Please find the class note for your reference.',
      date: '29 Sept',
      attachment: {
        name: '8085_microprocessor.pdf',
        type: 'PDF',
      },
    },
  ]);
  const [resources, setResources] = useState([
    { id: '1', name: 'Course Syllabus', type: 'PDF' },
    { id: '2', name: 'Week 1 Lecture Slides', type: 'PPTX' },
    { id: '3', name: 'Assignment 1 Guidelines', type: 'DOCX' },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceType, setNewResourceType] = useState('');

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      const announcement = {
        id: (announcements.length + 1).toString(),
        user: 'Current User',
        content: newAnnouncement,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement('');
    }
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (newResourceName.trim() && newResourceType.trim()) {
      const resource = {
        id: (resources.length + 1).toString(),
        name: newResourceName,
        type: newResourceType.toUpperCase(),
      };
      setResources([...resources, resource]);
      setNewResourceName('');
      setNewResourceType('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FF9500]  border-b shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-[#FF9500] mb-1">B.E. Computer</h1>
          <p className="text-lg text-gray-700">III Semester</p>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-[#FF9500] text-white">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="absolute right-4 bottom-0 flex space-x-2">
            <img src="/placeholder.svg?height=100&width=80" alt="Tablet" className="h-20 w-16 object-contain" />
            <img src="/placeholder.svg?height=100&width=100" alt="Smartphone" className="h-20 w-20 object-contain" />
            <img src="/placeholder.svg?height=100&width=120" alt="Laptop" className="h-20 w-24 object-contain" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="border-b border-gray-300">
              <TabsTrigger value="stream" className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100">Stream</TabsTrigger>
              <TabsTrigger value="classwork" className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100">Classwork</TabsTrigger>
              <TabsTrigger value="people" className="text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100">People</TabsTrigger>
            </TabsList>

            {/* Tab Content Sections */}
            <TabsContent value="stream">
              {/* Announcement Input */}
              <Card className="mb-6 shadow-lg rounded-lg">
                <CardContent className="pt-6">
                  <form onSubmit={handlePostAnnouncement}>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <Textarea 
                        placeholder="Announce something to your class"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <Button type="button" variant="outline" size="sm" className="border-gray-400 hover:border-[#FF9500]">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Add Attachment
                      </Button>
                      <Button type="submit" className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg">
                        Post
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Announcements */}
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="mb-6 shadow-lg rounded-lg">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={announcement.user} />
                          <AvatarFallback>{announcement.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-[#FF9500]">{announcement.user}</h3>
                          <p className="text-sm text-gray-500">{announcement.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-200">
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
                            <p className="font-medium">{announcement.attachment.name}</p>
                            <p className="text-sm text-gray-500">{announcement.attachment.type}</p>
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
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddResource} className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Resource name"
                        value={newResourceName}
                        onChange={(e) => setNewResourceName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg"
                      />
                      <Input
                        placeholder="Type (e.g., PDF)"
                        value={newResourceType}
                        onChange={(e) => setNewResourceType(e.target.value)}
                        className="w-24 border border-gray-300 rounded-lg"
                      />
                      <Button type="submit" className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </form>
                  <ul className="space-y-2">
                    {resources.map((resource) => (
                      <li key={resource.id} className="flex items-center justify-between border-b py-2 animate-fade-in">
                        <span className="text-gray-800">{resource.name} ({resource.type})</span>
                        <Button variant="link" size="sm" className="text-[#FF9500] hover:underline">View</Button>
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
                  <p className="text-gray-600">List of students and teachers will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Left Sidebar */}
        <aside className="w-64">
          <Card className="animate-fade-in shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Woohoo, no work due in soon!</p>
              <Button variant="link" className="mt-2 p-0 h-auto text-[#FF9500] hover:underline">View all</Button>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}

export default SingleClass;
