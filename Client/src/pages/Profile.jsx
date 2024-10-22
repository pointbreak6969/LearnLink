import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Phone, MapPin, Upload, Star, Menu } from 'lucide-react';

const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(80);
  const [savedResources, setSavedResources] = useState(3);
  const [uploadedResources, setUploadedResources] = useState([
    { id: 1, title: "Uploaded Resource 1", thumbnail: "https://img.freepik.com/free-vector/colorful-notepad_53876-67695.jpg", date: "2024-01-01" }
  ]);

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
        <div className="flex items-center justify-between mb-6 animate-slide-in">
          <div className="flex items-center">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/front-view-man-ambulance-car_23-2149478476.jpg"
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full mr-4 border-4 border-[#FF9500] shadow-md transition-transform hover:scale-105"
              />
              <button className="absolute bottom-0 right-0 bg-[#FF9500] text-white rounded-full p-2 hover:bg-[#E68600]">
                <i className="fa fa-camera"></i>
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FF9500]">Ram Poudel</h1>
              <p className="text-gray-600">Pokhara, Nepal</p>
            </div>
          </div>
          <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-transform hover:scale-105 mt-2">Edit Profile</Button>
        </div>

        {/* Profile Completion Bar */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-sm text-gray-500 mb-2">Profile Completion</h2>
          <Progress value={profileCompletion} className="w-full mb-2 bg-orange-200 [&>div]:bg-[#FF9500] transition-all" />
          <p className="text-sm text-gray-600">{profileCompletion}% Complete</p>
        </div>

        {/* Hamburger Menu for Tabs */}
        <div className="md:hidden mb-4">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center bg-[#FF9500] text-white">
            <Menu className="mr-2" /> Menu
          </Button>
          {isMenuOpen && (
            <div className="flex flex-col mt-2 bg-white shadow-md rounded-lg">
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('overview')}>Profile Overview</Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('saved')}>
                Saved Resources <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">{savedResources}</span>
              </Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('uploaded')}>Uploaded Resources</Button>
              <Button className="px-4 py-2 text-left" onClick={() => handleTabChange('points')}>Points Earned</Button>
            </div>
          )}
        </div>

        {/* Tabs for larger screens */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="hidden md:block">
          <TabsList className="bg-orange-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all">Profile Overview</TabsTrigger>
            <TabsTrigger value="saved" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all">
              Saved Resources <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">{savedResources}</span>
            </TabsTrigger>
            <TabsTrigger value="uploaded" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all">Uploaded Resources</TabsTrigger>
            <TabsTrigger value="points" className="px-4 py-2 data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all">Points Earned</TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="overview">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg animate-fade-in-up">
              <h2 className="text-2xl font-semibold mb-6 text-[#FF9500]">Profile Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#FF9500]">Personal Information</h3>
                  <p className="flex items-center"><User className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Full Name:</strong> Ram Poudel</p>
                  <p className="flex items-center"><Mail className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Email:</strong> rampoudel@gmail.com</p>
                  <p className="flex items-center"><Phone className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Contact Number:</strong> +977 980-456-7891</p>
                  <p className="flex items-center"><MapPin className="text-[#FF9500] mr-2" /> <strong className="text-[#FF9500]">Location:</strong> Pokhara, Nepal</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all animate-fade-in-up">
              <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">Saved Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#FF9500] p-2 rounded-lg hover:shadow-lg transition-all">
                  <img
                    src="/placeholder.svg?height=100&width=150"
                    alt="Resource Thumbnail"
                    width={150}
                    height={100}
                    className="mb-2 rounded-md"
                  />
                  <p className="text-sm">Resource Title 1</p>
                  <p className="text-xs text-gray-500">Saved on: 2024-01-01</p>
                  <Button variant="link" className="text-xs p-0 text-[#FF9500] hover:text-[#E68600]">Remove</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="uploaded">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all animate-fade-in-up">
              <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">Uploaded Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uploadedResources.map((resource) => (
                  <div key={resource.id} className="border border-[#FF9500] p-2 rounded-lg hover:shadow-lg transition-all">
                    <img
                      src={resource.thumbnail}
                      alt={`Thumbnail for ${resource.title}`}
                      width={150}
                      height={100}
                      className="mb-2 rounded-md"
                    />
                    <p className="text-sm">{resource.title}</p>
                    <p className="text-xs text-gray-500">Uploaded on: {resource.date}</p>
                    <div className="flex justify-between">
                      <Button variant="link" className="text-xs p-0 mr-2 text-[#FF9500] hover:text-[#E68600]">Edit</Button>
                      <Button variant="link" className="text-xs p-0 text-red-500 hover:text-red-600">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 bg-[#FF9500] text-white hover:bg-[#E68600] transition-transform hover:scale-105">
                <Upload className="mr-2" /> Upload New Resource
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="points">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
        <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">Points Earned</h2>
        <Progress value={60} className="w-full mb-4 bg-orange-200 [&>div]:bg-[#FF9500]" />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#FF9500] flex items-center">
              <Star className="mr-2" /> You Have Earned
            </h3>
            <p className="text-xl font-semibold text-[#FF9500]">60 Points</p>
          </div>
          <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-transform hover:scale-105">
            Redeem Points
          </Button>
        </div>
      </div>
    </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
