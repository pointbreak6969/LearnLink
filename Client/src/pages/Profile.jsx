import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/store/profileReducer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Star,
  Trash2,
  BookOpen,
  Edit,
  Save,
  Clock,
  Award,
  ChevronRight ,
  ChevronLeft
} from "lucide-react";
import UploadResources from "@/components/UploadResources";
import ClassroomHandle from "@/components/ClassroomHandle";
import PointsEarned from "@/components/PointsEarned";


const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(80);
  const [savedResources, setSavedResources] = useState(3);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabsListRef = useRef(null);

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: 200,
        behavior: "smooth" 
      });
    }
  };

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: -200,
        behavior: "smooth" 
      });
    }
  };

  const checkScroll = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  const dispatch = useDispatch()
  const profileDetails = useSelector((state)=> state.profile.profileDetails)
  const status = useSelector((state)=> state.profile.status);
  useEffect(()=> {
    if (status === "idle"){
      dispatch(fetchProfileDetails())
    }
  }, [dispatch, status])
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileDetails.profilePicture.url}></AvatarImage>
                <AvatarFallback>profile pic</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FF9500]">{profileDetails.user_details.fullName}</h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {profileDetails.contactInfo.location}
              </p>
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
          <Progress
            value={profileCompletion}
            className="w-full mb-2 bg-orange-200 [&>div]:bg-[#FF9500] transition-all"
          />
          <p className="text-sm text-gray-600">{profileCompletion}% Complete</p>
        </div>

        {/* Tabs for larger screens */}
        <div className="max-w-7xl mx-auto relative">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
            <div className="relative">
              {/* Left Arrow */}
              {showLeftArrow && (
                <button 
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
              )}
              
              {/* Right Arrow */}
              {showRightArrow && (
                <button 
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              )}
              
              {/* Scrollable TabsList */}
              <div className="overflow-hidden">
                <TabsList 
                  ref={tabsListRef} 
                  className="bg-orange-100 p-1 rounded-lg flex justify-start overflow-x-auto scrollbar-hide"
                  onScroll={checkScroll}
                >
                  <TabsTrigger
                    value="overview"
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-2 inline" /> Profile Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="saved"
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <Save className="w-4 h-4 mr-2 inline" /> Saved Resources
                    <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      {savedResources}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="uploaded"
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <Upload className="w-4 h-4 mr-2 inline" /> Uploaded Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="points"
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <Star className="w-4 h-4 mr-2 inline" /> Points Earned
                  </TabsTrigger>
                  <TabsTrigger
                    value="classrooms"
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-[#FF9500] data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <BookOpen className="w-4 h-4 mr-2 inline" /> Classrooms
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Tabs Content */}
            <TabsContent value="overview">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-[#FF9500]">
                    Profile Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-[#FF9500]">
                        Personal Information
                      </h3>
                      <p className="flex items-center mb-2">
                        <User className="text-[#FF9500] mr-2" />{" "}
                        <strong className="text-[#FF9500]">Full Name:</strong>{" "}
                        {profileDetails.user_details.fullName}
                      </p>
                      <p className="flex items-center mb-2">
                        <Mail className="text-[#FF9500] mr-2" />{" "}
                        <strong className="text-[#FF9500]">Email:</strong>{" "}
                        {profileDetails.user_details.email}
                      </p>
                      <p className="flex items-center mb-2">
                        <Phone className="text-[#FF9500] mr-2" />{" "}
                        <strong className="text-[#FF9500]">
                          Contact Number:
                        </strong>{" "}
                        {profileDetails.contactInfo.phone}
                      </p>
                      <p className="flex items-center mb-2">
                        <MapPin className="text-[#FF9500] mr-2" />{" "}
                        <strong className="text-[#FF9500]">Location:</strong>{" "}
                        {profileDetails.contactInfo.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#FF9500]">
                    Saved Resources
                  </CardTitle>
                </CardHeader>
                <CardContent >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-[#FF9500] p-2 rounded-lg hover:shadow-lg transition-all duration-300">
                      <img
                        src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                        alt="Resource Thumbnail"
                        width={150}
                        height={100}
                        className="mb-2 rounded-md"
                      />
                      <p className="text-sm">Resource Title 1</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> Saved on: 2024-01-01
                      </p>
                      <Button
                        variant="link"
                        className="text-xs p-0 text-[#FF9500] hover:text-[#E68600] transition-colors duration-300"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <UploadResources />
           <PointsEarned/>
            <ClassroomHandle />
          </Tabs>
               
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
