import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/store/profileReducer";
import {
  User,
  MapPin,
  Upload,
  Star,
  BookOpen,
  Save,
  Award,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Edit,
} from "lucide-react";
import ClassroomHandle from "@/components/ClassroomHandle";
import PointsEarned from "@/components/PointsEarned";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(80);
  const [savedResources, setSavedResources] = useState(3);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [error, setError] = useState("")
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const tabsListRef = useRef(null);
  const dispatch = useDispatch();
  const profileDetails = useSelector(
    (state) => state.profile.profileDetails?.[0] || {}
  );
  const status = useSelector((state) => state.profile.status);
  const userData = useSelector((state) => state.auth.userData);

  const fullName = userData?.fullName || "N/A";

  const getProfileData = (data) => (data !== undefined ? data : "N/A");

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: "smooth" });
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
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfileDetails());
    }
  }, [dispatch, status]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  if (status === "loading") {
    return (
      <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg">
        <Skeleton className="h-16 w-16 rounded-full mb-4" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Progress
          value={profileCompletion}
          className="w-full mb-2 bg-orange-200"
        />
        <Skeleton className="h-6 w-full mb-4" />
        <Tabs>
          <Skeleton className="h-10 w-1/4 mb-2" />
          <Skeleton className="h-10 w-1/4 mb-2" />
        </Tabs>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <Alert variant="destructive" className="mb-4 max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load profile details. Please try again later or contact
            support if the issue persists.
          </AlertDescription>
        </Alert>
        <img
          src="/api/placeholder/400/300"
          alt="Error"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  profileDetails?.profilePicture?.url ||
                  "https://via.placeholder.com/150"
                }
              />
              <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#FF9500]">{fullName}</h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {getProfileData(profileDetails?.contactInfo?.location)}
            </p>
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                <Edit className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md p-6">
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Enter the folowing Details:</DialogDescription>
              <form className="flex items-center space-x-2 mt-4 flex-col space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="profile" className="text-gray-700">
                    Upload Profile
                  </label>
                  <Input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="location" className="text-gray-700">
                    Location
                  </label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter your location"
                    className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="university" className="text-gray-700">
                    University Name
                  </label>
                  <Input
                    type="text"
                    id="university"
                    name="university"
                    placeholder="Enter university name"
                    className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="college" className="text-gray-700">
                    College Name
                  </label>
                  <Input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="Enter your college"
                    className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                >
                  Submit
                </Button>
              </form>
              {/* Display error message if class code is missing */}
              {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

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

      <div className="max-w-7xl mx-auto relative">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="relative">
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            )}

            <div className="overflow-hidden">
              <TabsList
                ref={tabsListRef}
                className="bg-orange-100 p-1 rounded-lg flex justify-start overflow-x-auto scrollbar-hide"
                onScroll={checkScroll}
              >
                <TabsTrigger
                  value="overview"
                  className="px-4 py-2 whitespace-nowrap"
                >
                  <User className="w-4 h-4 mr-2 inline" /> Profile Overview
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="px-4 py-2 whitespace-nowrap"
                >
                  <Save className="w-4 h-4 mr-2 inline" /> Saved Resources
                  <span className="ml-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    {savedResources}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="uploaded"
                  className="px-4 py-2 whitespace-nowrap"
                >
                  <Upload className="w-4 h-4 mr-2 inline" /> Uploaded Resources
                </TabsTrigger>
                <TabsTrigger
                  value="points"
                  className="px-4 py-2 whitespace-nowrap"
                >
                  <Star className="w-4 h-4 mr-2 inline" /> Points Earned
                </TabsTrigger>
                <TabsTrigger
                  value="classrooms"
                  className="px-4 py-2 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 mr-2 inline" /> Classrooms
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#FF9500]">
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Welcome to your profile! Explore your resources and manage
                  classrooms here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <UploadResources />
          </TabsContent>

          <TabsContent value="uploaded">
            <UploadResources />
          </TabsContent>

          <TabsContent value="points">
            <PointsEarned />
          </TabsContent>

          <TabsContent value="classrooms">
            <ClassroomHandle />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
