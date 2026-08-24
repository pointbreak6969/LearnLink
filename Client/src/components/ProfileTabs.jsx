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
            <ChevronLeft className="h-5 w-5 text-ink-600" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-ink-600" />
          </button>
        )}

        <div className="overflow-hidden">
          <TabsList
            ref={tabsListRef}
            className="bg-brand-50 p-1 rounded-xl flex justify-start overflow-x-auto scrollbar-hide"
            onScroll={checkScroll}
          >
            <TabsTrigger
              value="overview"
              className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm"
            >
              <User className="w-4 h-4 mr-2 inline" /> Profile Overview
            </TabsTrigger>
            <TabsTrigger value="saved" className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm">
              <Save className="w-4 h-4 mr-2 inline" /> Saved Resources
              <span className="ml-1.5 text-xs bg-brand-500 text-white px-1.5 py-0.5 rounded-full">
                {savedResources}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="uploaded"
              className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm"
            >
              <Upload className="w-4 h-4 mr-2 inline" /> Uploaded Resources
            </TabsTrigger>
            <TabsTrigger value="points" className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm">
              <Star className="w-4 h-4 mr-2 inline" /> Points Earned
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="overview">
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-ink-900">
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profileDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold mb-3 text-brand-600">
                    Personal Information
                  </h3>
                  <p className="flex items-center">
                    <User className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">
                      Full Name:&nbsp;
                    </strong>{" "}
                    <span className="text-ink-800">{data.fullName}</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">Email:&nbsp;</strong>
                    <span className="text-ink-800">{data.email}</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">
                      Contact Number:&nbsp;
                    </strong>{" "}
                    <span className="text-ink-800">{data.phone}</span>
                  </p>
                  <p className="flex items-center">
                    <MapPin className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">
                      Location:&nbsp;
                    </strong>{" "}
                    <span className="text-ink-800">{data.location}</span>
                  </p>
                  <p className="flex items-center">
                    <GraduationCap className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">
                      University:&nbsp;
                    </strong>{" "}
                    <span className="text-ink-800">{data.university}</span>
                  </p>
                  <p className="flex items-center">
                    <Building className="text-brand-500 mr-2 h-4 w-4" />
                    <strong className="text-ink-700 font-medium">
                      College:&nbsp;
                    </strong>{" "}
                    <span className="text-ink-800">{data.college}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-ink-600">
                  Welcome to your profile! Explore your resources and manage
                  classrooms here.
                </p>
                <div className="mt-5 ">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
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
                          <label htmlFor="profile" className="text-ink-700">
                            Complete Profile
                          </label>
                          <Input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            className="flex-grow focus:ring-2 focus:ring-brand-500 transition-all duration-200"
                            {...register("profilePicture", {required: true})}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="phone" className="text-ink-700">
                            Phone Number
                          </label>
                          <Input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            className="flex-grow focus:ring-2 focus:ring-brand-500 transition-all duration-200"
                            {...register("phone", {required: true})}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="location" className="text-ink-700">
                            Location
                          </label>
                          <Input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter your location"
                            className="flex-grow focus:ring-2 focus:ring-brand-500 transition-all duration-200"
                            {...register("location", {required: true})}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="university" className="text-ink-700">
                            University Name
                          </label>
                          <Input
                            type="text"
                            id="university"
                            name="university"
                            placeholder="Enter university name"
                            className="flex-grow focus:ring-2 focus:ring-brand-500 transition-all duration-200"
                            {...register("university", {required: true})}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="college" className="text-ink-700">
                            College Name
                          </label>
                          <Input
                            type="text"
                            id="college"
                            name="college"
                            placeholder="Enter your college"
                            className="flex-grow focus:ring-2 focus:ring-brand-500 transition-all duration-200"
                            {...register("college", {required: true})}
                          />
                        </div>

                        <Button type="submit" className="w-full">
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
