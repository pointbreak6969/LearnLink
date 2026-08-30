import Resources from "./Resources";
import PointsEarned from "./PointsEarned";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  User,
  MapPin,
  Upload,
  Star,
  Mail,
  Phone,
  GraduationCap,
  Building,
} from "lucide-react";
import { useState } from "react";

const ProfileTabs = () => {
  const profileDetails = useSelector(
    (state) => state.profile.profileDetails || null
  );
  const [activeTab, setActiveTab] = useState("overview");

  const data = {
    fullName: profileDetails?.user_details?.fullName || "N/A",
    phone: profileDetails?.contactInfo?.phone || "Not set",
    email: profileDetails?.user_details?.email || "Not set",
    university: profileDetails?.contactInfo?.university || "Not provided",
    college: profileDetails?.contactInfo?.college || "Not provided",
    location: profileDetails?.contactInfo?.location || "Not set",
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto pb-2">
        <TabsList className="bg-brand-50/80 p-1 rounded-xl flex justify-start w-auto inline-flex">
          <TabsTrigger
            value="overview"
            className="px-4 py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm"
          >
            <User className="w-3.5 h-3.5 mr-1.5 inline" /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="px-4 py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5 inline" /> Uploaded Resources
          </TabsTrigger>
          <TabsTrigger
            value="points"
            className="px-4 py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-sm"
          >
            <Star className="w-3.5 h-3.5 mr-1.5 inline" /> Points & Rewards
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-4">
        <Card className="border-brand-200 shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-ink-900">
              Personal & Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <User className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">Full Name</span>
                  <span className="text-sm font-bold text-ink-900">{data.fullName}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <Mail className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">Email</span>
                  <span className="text-sm font-bold text-ink-900">{data.email}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <Phone className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">Phone</span>
                  <span className="text-sm font-bold text-ink-900">{data.phone}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <MapPin className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">Location</span>
                  <span className="text-sm font-bold text-ink-900">{data.location}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <GraduationCap className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">University</span>
                  <span className="text-sm font-bold text-ink-900">{data.university}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-3">
                <Building className="text-brand-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="text-xs text-ink-500 font-semibold block">Faculty / College</span>
                  <span className="text-sm font-bold text-ink-900">{data.college}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resources" className="mt-4">
        <Resources />
      </TabsContent>

      <TabsContent value="points" className="mt-4">
        <PointsEarned />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
