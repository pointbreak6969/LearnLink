import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import AvatarComponent from "@/components/AvatarComponent";
import ProfileTabs from "@/components/ProfileTabs";
import { MapPin, Award, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
const Profile = () => {
  const [profileCompletion, setProfileCompletion] = useState(80);

  const { profile, updateProfile, isProfileLoading, completeProfile, isCompletingProfile, isUpdatingProfile } = useProfile();
  const { user } = useAuth();
  const fullName = user?.data?.fullName || "N/A";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const data = {
    profilePicture: profile?.profilePicture?.url,
    location: profile?.contactInfo?.location || "N/A",
  };
  const onSubmit = async (data) => {
    updateProfile(data, {
      //toast message
    });
  };
  if (isProfileLoading) {
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
  return (
    <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-5">
          <div className="relative">
            <AvatarComponent
              profilePicture={data.profilePicture}
              fullName={fullName}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#FF9500]">{fullName}</h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> {data.location}
            </p>
          </div>
        </div>
        <div>
          {profile && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md p-6">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Enter the folowing Details:
                </DialogDescription>
                <form
                  className="flex items-center space-x-2 mt-4 flex-col space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col w-full">
                    <label htmlFor="profile" className="text-gray-700">
                      Upload Profile
                    </label>
                    <Input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      className="flex-grow focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      {...register("profilePicture")}
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
                      {...register("phone")}
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
                      {...register("location")}
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
                      {...register("university")}
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
                      {...register("college")}
                    />
                  </div>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                    >
                      Submit
                    </Button>
                  </DialogClose>
                </form>
                {/* Display error message if class code is missing */}
              </DialogContent>
            </Dialog>
          )}
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
        <ProfileTabs profile={profile} completeProfile={completeProfile} isCompletingProfile={isCompletingProfile}/>
      </div>
    </div>
  );
};

export default Profile;
