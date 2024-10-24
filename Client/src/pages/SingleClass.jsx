import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MoreVertical, PlusCircle, FileText, Paperclip, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Label } from '@/components/ui/label';

const SingleClass = () => {
  
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: "", description: "", file: null });
  const [activeTab, setActiveTab] = useState('stream');
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      user: 'Ashim Gautam',
      content: 'Dear Students, Please find the class note for your reference.',
      date: '29 Sept',
      attachment: {
        name: 'english_class_note.pdf',
        type: 'PDF',
      },
    },
    {
      id: '2',
      user: 'Ram poudel',
      content: 'Dear Students, Please find the class note for your reference.',
      date: '2 Sept',
      attachment: {
        name: 'physics_class_note.pdf',
        type: 'PDF',
      },
    },
  ]);
  const [resources, setResources] = useState([
    { id: '1', name: 'Course Syllabus', type: 'PDF' },
    { id: '2', name: 'Week 1 Lecture Slides', type: 'PPTX' },
    { id: '3', name: 'Assignment 1 Guidelines', type: 'DOCX' },
  ]);
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
  
  };

  const handleAddResource = (e) => {
    e.preventDefault();
   
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-black">B.E. Computer</h1>
            <p className="text-lg text-gray-800">III Semester</p>
          </div>
        </header>

        {/* Banner */}
        <div className="bg-gradient-to-b from-orange-50 to-orange-100 text-white py-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl text-black font-semibold">Welcome to Your Class!</h2>
            <p className="mt-2 text-lg text-gray-900">Stay updated with announcements and resources.</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
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
                      <div className="flex flex-col md:flex-row items-center space-x-4 mb-4">
                        <Avatar className="mb-2 md:mb-0">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <Textarea
                          placeholder="Announce something to your class"
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
                      <div className="flex flex-col md:flex-row items-center space-x-2">
                        <Input
                          placeholder="Resource name"
                           className="flex-1 border border-gray-300 rounded-lg mb-2 md:mb-0"
                        />
                        <Input
                          placeholder="Type (e.g., PDF)"
                          
                          className="w-24 border border-gray-300 rounded-lg mb-2 md:mb-0"
                        />
                        <Button type="submit" className="bg-[#FF9500]  text-white rounded-lg">
                              <Dialog open={isAddResourceDialogOpen} onOpenChange={setIsAddResourceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#FF9500]   text-white hover:bg-transparent transition-all duration-300 hover:scale-105">
                        <Upload className="mr-2" />Upload
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
                          <Input
                            id="title"
                             className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
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
                        <Button type="submit" >Add Resource</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
        </main>
      </div>
    </>
  );
}

export default SingleClass;
