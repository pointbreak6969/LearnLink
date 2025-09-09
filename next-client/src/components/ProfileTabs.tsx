import Resources from "./Resources";
import PointsEarned from "./PointsEarned";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  User,
  MapPin,
  Upload,
  Star,
  Save,
  ChevronRight,
  ChevronLeft,
  Edit,
  Mail,
  Phone,
  GraduationCap,
  Building,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import profileService from "@/services/profile";
import { useDispatch } from "react-redux";
import { fetchProfileDetails } from "@/store/profileReducer";
const ProfileTabs = () => {
  const dispatch = useDispatch();
  const profileDetails = useSelector(
    (state) => state.profile.profileDetails || null
  );
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [savedResources, setSavedResources] = useState(3);
  const [activeTab, setActiveTab] = useState("overview");
  const tabsListRef = useRef(null);
  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
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
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm(); 
  const completeProfile = async (data)=>{
    setError("");
    try {
     const completeProfile =await profileService.completeProfile(data);      
     if (completeProfile) {
       dispatch(fetchProfileDetails());
      }
    } catch (error) {
      setError(error.message);
    }
  }
  const data = {
    fullName: profileDetails?.user_details?.fullName || null,
    phone: profileDetails?.contactInfo?.phone || null,
    email: profileDetails?.user_details?.email || null,
    university: profileDetails?.contactInfo?.university || null,
    college: profileDetails?.contactInfo?.college || null,
    location: profileDetails?.contactInfo?.location,
  };
  return (
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
            <TabsTrigger value="saved" className="px-4 py-2 whitespace-nowrap">
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
            <TabsTrigger value="points" className="px-4 py-2 whitespace-nowrap">
              <Star className="w-4 h-4 mr-2 inline" /> Points Earned
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
            {profileDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#FF9500]">
                    Personal Information
                  </h3>
                  <p className="flex items-center mb-2">
                    <User className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">
                      Full Name: &nbsp;
                    </strong>{" "}
                    {data.fullName}
                  </p>
                  <p className="flex items-center mb-2">
                    <Mail className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">Email: &nbsp; </strong>
                    {data.email}
                  </p>
                  <p className="flex items-center mb-2">
                    <Phone className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">
                      Contact Number: &nbsp;
                    </strong>{" "}
                    {data.phone}
                  </p>
                  <p className="flex items-center mb-2">
                    <MapPin className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">
                      Location: &nbsp;
                    </strong>{" "}
                    {data.location}
                  </p>
                  <p className="flex items-center mb-2">
                    <GraduationCap className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">
                      University: &nbsp;
                    </strong>{" "}
                    {data.university}
                  </p>
                  <p className="flex items-center mb-2">
                    <Building className="text-[#FF9500] mr-2" />
                    <strong className="text-[#FF9500]">
                      College: &nbsp;
                    </strong>{" "}
                    {data.college}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Welcome to your profile! Explore your resources and manage
                  classrooms here.
                </p>
                <div className="mt-5 ">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                        <Edit className="w-4 h-4 mr-2" /> Complete Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-md p-6">
                      <DialogTitle>Complete Profile</DialogTitle>
                      <DialogDescription>
                        Enter the folowing Details:
                      </DialogDescription>
                      <form className="flex items-center space-x-2 mt-4 flex-col space-y-4" onSubmit={handleSubmit(completeProfile)}>
                        <div className="flex flex-col w-full">
                          <label htmlFor="profile" className="text-gray-700">
                            Complete Profile
                          </label>
                          <Input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                            {...register("profilePicture", {required: true})}
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
                            {...register("phone", {required: true})}
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
                            {...register("location", {required: true})}
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
                            {...register("university", {required: true})}
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
                            {...register("college", {required: true})}
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
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="saved">
        <Resources />
      </TabsContent>

      <TabsContent value="uploaded">
        <Resources />
      </TabsContent>

      <TabsContent value="points">
        <PointsEarned />
      </TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
