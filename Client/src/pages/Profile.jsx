
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Phone, MapPin, Upload, Star, Menu, Trash2, BookOpen, Camera, Edit, Save, Clock, Award } from 'lucide-react';
import UploadResources from '@/components/UploadResources';
import ClassroomHandle from '@/components/ClassroomHandle';

const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(80);
  const [savedResources, setSavedResources] = useState(3);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  

  const handleTabChange = (value) => {
    setActiveTab(value);
    setIsMenuOpen(false); 
  };


  return (
    <>
      <Navbar />
      <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/front-view-man-ambulance-car_23-2149478476.jpg"
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full mr-4 border-4 border-[#FF9500] shadow-md transition-transform hover:scale-105"
              />
              <button className="absolute bottom-0 right-0 bg-[#FF9500] text-white rounded-full p-2 hover:bg-[#E68600] transition-colors duration-300" aria-label="Change profile picture">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FF9500]">Ram Poudel</h1>
              <p className="text-gray-600 flex items-center"><MapPin className="w-4 h-4 mr-1" /> Pokhara, Nepal</p>
            </div>
          </div>
          <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
            <Edit className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Profile Completion Bar */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-sm text-gray-500 mb-2 flex items-center">
            <Award className="w-4 h-4 mr-1" /> Profile Completion
          </h2>
          <Progress value={profileCompletion} className="w-full mb-2 bg-orange-200 [&>div]:bg-[#FF9500] transition-all" />
          <p className="text-sm text-gray-600">{profileCompletion}% Complete</p>
        </div>

        {/* Hamburger Menu for Tabs */}
        <div className="md:hidden mb-4">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center bg-[#FF9500] text-white hover:bg-[#E68600] transition-colors duration-300">
            <Menu className="mr-2" /> Menu
          </Button>
          {isMenuOpen && (
            <div className="flex flex-col mt-2 bg-white shadow-md rounded-lg animate-fade-in-down">
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('overview')}>
                <User className="w-4 h-4 mr-2 inline" /> Profile Overview
              </Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('saved')}>
                <Save className="w-4 h-4 mr-2 inline" /> Saved Resources 
                <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">{savedResources}</span>
              </Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('uploaded')}>
                <Upload className="w-4 h-4 mr-2 inline" /> Uploaded Resources
              </Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('points')}>
                <Star className="w-4 h-4 mr-2 inline" /> Points Earned
              </Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('classrooms')}>
                <BookOpen className="w-4 h-4 mr-2 inline" /> Classrooms
              </Button>
            </div>
          )}
        </div>

        {/* Tabs for larger screens */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="hidden md:block">
          <TabsList className="bg-orange-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300">
              <User className="w-4 h-4 mr-2 inline" /> Profile Overview
            </TabsTrigger>
            <TabsTrigger value="saved" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300">
              <Save className="w-4 h-4 mr-2 inline" /> Saved Resources 
              <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">{savedResources}</span>
            </TabsTrigger>
            <TabsTrigger value="uploaded" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300">
              <Upload className="w-4 h-4 mr-2 inline" /> Uploaded Resources
            </TabsTrigger>
            <TabsTrigger value="points" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300">
              <Star className="w-4 h-4 mr-2 inline" /> Points Earned
            </TabsTrigger>
            <TabsTrigger value="classrooms" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300">
              <BookOpen className="w-4 h-4 mr-2 inline" /> Classrooms
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="overview">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#FF9500]">Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-[#FF9500]">Personal Information</h3>
                    <p className="flex items-center mb-2"><User className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Full Name:</strong> Ram Poudel</p>
                    <p className="flex items-center mb-2"><Mail className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Email:</strong> rampoudel@gmail.com</p>
                    <p className="flex items-center mb-2"><Phone className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Contact Number:</strong> +977 980-456-7891</p>
                    <p className="flex items-center mb-2"><MapPin className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Location:</strong> Pokhara, Nepal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#FF9500]">Saved Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-[#FF9500] p-2 rounded-lg hover:shadow-lg transition-all duration-300">
                    <img
                      src="/placeholder.svg?height=100&width=150"
                      alt="Resource Thumbnail"
                      width={150}
                      height={100}
                      className="mb-2 rounded-md"
                    />
                    <p className="text-sm">Resource Title 1</p>
                    <p className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> Saved on: 2024-01-01</p>
                    <Button variant="link" className="text-xs p-0 text-[#FF9500] hover:text-[#E68600] transition-colors duration-300">
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <UploadResources/>
          
          <TabsContent value="points">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#FF9500]">Points Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={60} className="w-full mb-4 bg-orange-200 [&>div]:bg-[#FF9500]" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#FF9500] flex items-center">
                      <Star className="mr-2" /> You Have Earned
                    </h3>
                    <p className="text-xl font-semibold text-[#FF9500]">60 Points</p>
                  </div>
                  <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                    Redeem Points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <ClassroomHandle/>
               </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Profile;