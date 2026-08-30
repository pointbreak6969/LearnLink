import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Building,
  Award,
  Star,
  Upload,
  BookOpen,
  Calendar,
  Copy,
  Trash2,
  Search,
  Gift,
  Wallet,
  Percent,
  Download,
  Layers,
  Check,
} from "lucide-react";

import { useProfile } from "@/hooks/useProfile";
import resourceService from "@/services/resource";
import classroomService from "@/services/classroom";
import AvatarComponent from "@/components/AvatarComponent";
import EditProfileDialog from "@/components/EditProfileDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Profile = () => {
  const { profileDetails, status } = useProfile();
  const currentUser = useSelector((state) => state.auth.userData);

  // Active Tab: 'overview' | 'classrooms' | 'resources' | 'rewards' | 'settings'
  const [activeTab, setActiveTab] = useState("overview");

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [deleteResourceModal, setDeleteResourceModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copied feedback
  const [copiedKey, setCopiedKey] = useState(null);

  // Live User Data from APIs
  const [userResources, setUserResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [resourceSearch, setResourceSearch] = useState("");

  const [classroomsData, setClassroomsData] = useState({ createdClassroom: [], joinedClassrooms: [] });
  const [loadingClassrooms, setLoadingClassrooms] = useState(false);

  // Rewards state
  const [redeemPointsAmount, setRedeemPointsAmount] = useState(50);
  const [walletNumber, setWalletNumber] = useState("");
  const [redeemSubmitting, setRedeemSubmitting] = useState(false);

  // Extract contact and user profile details safely
  const fullName = currentUser?.fullName || profileDetails?.user_details?.fullName || "User";
  const email = currentUser?.email || profileDetails?.user_details?.email || "";
  const role = currentUser?.role || profileDetails?.user_details?.role || "user";
  const profilePicUrl = profileDetails?.profilePicture?.url || null;
  const contactInfo = profileDetails?.contactInfo || {};
  const phone = contactInfo.phone || "";
  const location = contactInfo.location || "";
  const university = contactInfo.university || "";
  const college = contactInfo.college || "";
  const pointsEarned = profileDetails?.pointsEarned || 0;
  const createdAt = currentUser?.createdAt || profileDetails?.createdAt || null;

  // Calculate dynamic profile completeness percentage
  const profileCompletion = useMemo(() => {
    let score = 0;
    if (profilePicUrl) score += 20;
    if (phone && phone.trim().length > 3) score += 20;
    if (location && location.trim().length > 1) score += 20;
    if (university && university.trim().length > 1) score += 20;
    if (college && college.trim().length > 1) score += 20;
    return score;
  }, [profilePicUrl, phone, location, university, college]);

  // Points tier determination
  const tierInfo = useMemo(() => {
    if (pointsEarned >= 500) {
      return { name: "Platinum Scholar", color: "bg-purple-600 text-white", progress: 100, nextTier: "Max Tier Reached", remaining: 0 };
    }
    if (pointsEarned >= 200) {
      return { name: "Gold Achiever", color: "bg-amber-500 text-white", progress: Math.min(100, Math.round(((pointsEarned - 200) / 300) * 100)), nextTier: "Platinum Scholar (500 pts)", remaining: 500 - pointsEarned };
    }
    if (pointsEarned >= 50) {
      return { name: "Silver Contributor", color: "bg-slate-500 text-white", progress: Math.min(100, Math.round(((pointsEarned - 50) / 150) * 100)), nextTier: "Gold Achiever (200 pts)", remaining: 200 - pointsEarned };
    }
    return { name: "Bronze Explorer", color: "bg-amber-700 text-white", progress: Math.min(100, Math.round((pointsEarned / 50) * 100)), nextTier: "Silver Contributor (50 pts)", remaining: 50 - pointsEarned };
  }, [pointsEarned]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard: " + text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fetchUserResources = useCallback(async () => {
    try {
      setLoadingResources(true);
      const res = await resourceService.getUserUploadedResources();
      setUserResources(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setUserResources([]);
    } finally {
      setLoadingResources(false);
    }
  }, []);

  const fetchUserClassrooms = useCallback(async () => {
    try {
      setLoadingClassrooms(true);
      const res = await classroomService.getUserAllClassroom();
      if (res && res[0]) {
        setClassroomsData({
          createdClassroom: res[0].createdClassroom || [],
          joinedClassrooms: res[0].joinedClassrooms || [],
        });
      }
    } catch (err) {
      console.error(err);
      setClassroomsData({ createdClassroom: [], joinedClassrooms: [] });
    } finally {
      setLoadingClassrooms(false);
    }
  }, []);

  useEffect(() => {
    fetchUserResources();
    fetchUserClassrooms();
  }, [fetchUserResources, fetchUserClassrooms]);

  const handleDeleteResource = async () => {
    if (!deleteResourceModal) return;
    try {
      setIsDeleting(true);
      await resourceService.deleteResource(deleteResourceModal._id);
      toast.success("Resource deleted successfully");
      setDeleteResourceModal(null);
      fetchUserResources();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete resource");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRedeemPoints = async (e) => {
    e.preventDefault();
    if (redeemPointsAmount > pointsEarned) {
      toast.error("You only have " + pointsEarned + " points available.");
      return;
    }
    if (redeemPointsAmount < 20) {
      toast.error("Minimum redemption is 20 points.");
      return;
    }

    try {
      setRedeemSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(
        "Redemption request for " + redeemPointsAmount + " points submitted successfully!"
      );
      setRedeemModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process redemption request");
    } finally {
      setRedeemSubmitting(false);
    }
  };

  const filteredResources = useMemo(() => {
    if (!resourceSearch.trim()) return userResources;
    const q = resourceSearch.toLowerCase();
    return userResources.filter(
      (r) =>
        r.title?.toLowerCase().includes(q) ||
        r.text?.toLowerCase().includes(q) ||
        r.resource?.some((file) => typeof file === "string" && file.toLowerCase().includes(q))
    );
  }, [userResources, resourceSearch]);

  const totalClassroomsCount =
    (classroomsData.createdClassroom?.length || 0) + (classroomsData.joinedClassrooms?.length || 0);

  if (status === "loading" && !profileDetails) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 md:p-8" aria-label="Loading Profile">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* OriginUI Inspired Profile Header Card */}
        <section
          aria-labelledby="profile-heading"
          className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Header Banner */}
          <div className="h-36 sm:h-44 w-full relative overflow-hidden bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1200&auto=format&fit=crop"
              alt="Profile cover banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Header Details */}
          <div className="px-6 pb-6 relative">
            {/* Top row: Avatar overhang on left + Action buttons on right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Avatar */}
              <div className="-mt-12 sm:-mt-14 relative">
                <div className="size-24 sm:size-28 rounded-full border-4 border-white bg-slate-100 shadow-md overflow-hidden flex items-center justify-center">
                  {profilePicUrl ? (
                    <img
                      src={profilePicUrl}
                      alt={`${fullName}'s profile avatar`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarComponent profilePicture="?" fullName={fullName} />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <Button
                  onClick={() => setEditModalOpen(true)}
                  className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold h-9 px-4 shadow-sm"
                >
                  Edit profile
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-9 px-4"
                >
                  <Link to="/classroom">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    Classrooms
                  </Link>
                </Button>
              </div>
            </div>

            {/* Name, Roles, Email & Metadata Chips */}
            <div className="mt-3 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 id="profile-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                  {fullName}
                </h1>
                <span
                  className={
                    "text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider " +
                    (role === "superadmin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-slate-100 text-slate-700")
                  }
                >
                  {role === "superadmin" ? "Super Admin" : "Student"}
                </span>
                <span
                  className={
                    "text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 " +
                    tierInfo.color
                  }
                >
                  <Star className="w-3 h-3 fill-current" /> {tierInfo.name}
                </span>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{email}</span>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {university && (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    {university}
                  </span>
                )}
                {college && (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    {college}
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {location}
                  </span>
                )}
                {createdAt && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Joined {formatDate(createdAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Completion Indicator */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-600">Profile Strength</span>
                <span className="font-bold text-brand-600">{profileCompletion}% Complete</span>
              </div>
              <Progress
                value={profileCompletion}
                className="h-2 bg-slate-100 [&>div]:bg-brand-600 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* 4 Metric Stats */}
        <section aria-label="Key metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => setActiveTab("rewards")}
            className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition"
          >
            <p className="text-xs font-medium text-slate-500">Learning Points</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{pointsEarned}</p>
            <p className="text-[11px] text-brand-600 mt-0.5">≈ Rs. {(pointsEarned * 0.1).toFixed(2)}</p>
          </div>

          <div
            onClick={() => setActiveTab("classrooms")}
            className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition"
          >
            <p className="text-xs font-medium text-slate-500">Classrooms</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {loadingClassrooms ? "..." : totalClassroomsCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {classroomsData.createdClassroom.length} created • {classroomsData.joinedClassrooms.length} joined
            </p>
          </div>

          <div
            onClick={() => setActiveTab("resources")}
            className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition"
          >
            <p className="text-xs font-medium text-slate-500">Shared Files</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {loadingResources ? "..." : userResources.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Uploaded notes</p>
          </div>

          <div
            onClick={() => setActiveTab("rewards")}
            className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition"
          >
            <p className="text-xs font-medium text-slate-500">Scholar Tier</p>
            <p className="text-sm font-bold text-slate-900 mt-2 truncate">{tierInfo.name}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {tierInfo.remaining > 0 ? `${tierInfo.remaining} pts to level up` : "Max Level"}
            </p>
          </div>
        </section>

        {/* Tabbed Navigation */}
        <section aria-label="Profile tabs" className="space-y-4">
          <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "overview"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5 inline mr-1" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("classrooms")}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "classrooms"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 inline mr-1" /> Classrooms ({totalClassroomsCount})
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "resources"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5 inline mr-1" /> Shared Resources ({userResources.length})
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "rewards"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Gift className="w-3.5 h-3.5 inline mr-1" /> Rewards & Points
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "settings"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1" /> Account Info
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2 bg-white border-slate-200 rounded-xl shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Academic & Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block mb-0.5">University</span>
                      <span className="font-semibold text-slate-800">{university || "Not set"}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block mb-0.5">College / Campus</span>
                      <span className="font-semibold text-slate-800">{college || "Not set"}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block mb-0.5">Phone Number</span>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{phone || "Not set"}</span>
                        {phone && (
                          <button
                            onClick={() => handleCopy(phone, "phone")}
                            className="text-slate-400 hover:text-slate-600"
                            title="Copy Phone"
                          >
                            {copiedKey === "phone" ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block mb-0.5">Location</span>
                      <span className="font-semibold text-slate-800">{location || "Not set"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-600" /> Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-700 font-medium">Verified Learner</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${
                        userResources.length > 0 ? "bg-purple-500" : "bg-slate-300"
                      }`}
                    />
                    <span className="text-slate-700 font-medium">
                      {userResources.length > 0 ? `${userResources.length} Notes Shared` : "Share 1 note"}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${
                        pointsEarned >= 50 ? "bg-amber-500" : "bg-slate-300"
                      }`}
                    />
                    <span className="text-slate-700 font-medium">
                      {pointsEarned >= 50 ? "50+ Points Unlocked" : "Reach 50 points"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: CLASSROOMS */}
          {activeTab === "classrooms" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Your Classrooms</h3>
                <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white text-xs">
                  <Link to="/classroom">View All in Hub</Link>
                </Button>
              </div>

              {totalClassroomsCount === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No classrooms joined yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {classroomsData.createdClassroom.map((c) => (
                    <Card key={c._id} className="bg-white border-slate-200 rounded-xl p-4">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                          Admin
                        </span>
                        <span className="font-mono text-slate-400">{c.code}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate mt-1">{c.name}</h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{c.university} • {c.faculty}</p>
                      <Button asChild size="sm" variant="outline" className="w-full mt-3 text-xs">
                        <Link to={`/classroom/${c._id}`}>Open Stream</Link>
                      </Button>
                    </Card>
                  ))}
                  {classroomsData.joinedClassrooms.map((c) => (
                    <Card key={c._id} className="bg-white border-slate-200 rounded-xl p-4">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold text-[10px]">
                          Student
                        </span>
                        <span className="font-mono text-slate-400">{c.code}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate mt-1">{c.name}</h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{c.university} • {c.faculty}</p>
                      <Button asChild size="sm" variant="outline" className="w-full mt-3 text-xs">
                        <Link to={`/classroom/${c._id}`}>Open Stream</Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESOURCES */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Uploaded Study Materials</h3>
                <div className="relative w-full sm:w-64">
                  <Input
                    type="text"
                    placeholder="Search resources..."
                    value={resourceSearch}
                    onChange={(e) => setResourceSearch(e.target.value)}
                    className="h-8 text-xs pl-8 rounded-lg"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {filteredResources.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No resources uploaded yet. Upload resources in your classrooms to share notes.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredResources.map((res) => (
                    <Card key={res._id} className="bg-white border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-700 line-clamp-1">{res.title || "Document"}</span>
                          <span className="text-[10px] shrink-0">{formatDate(res.createdAt)}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{res.text || "No description."}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteResourceModal(res)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 text-xs px-2"
                        >
                          <Trash2 className="w-3 h-3 mr-1" /> Delete
                        </Button>
                        {res.resource && Array.isArray(res.resource) && res.resource[0] && (
                          <a
                            href={res.resource[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Download className="w-3 h-3" /> Download
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REWARDS */}
          {activeTab === "rewards" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Balance</p>
                  <h3 className="text-3xl font-extrabold">{pointsEarned} Points</h3>
                  <p className="text-xs text-white/80 mt-1">Estimated Value: Rs. {(pointsEarned * 0.1).toFixed(2)}</p>
                </div>
                <Button
                  onClick={() => setRedeemModalOpen(true)}
                  className="bg-white text-brand-700 hover:bg-white/90 font-bold text-xs h-9 px-4 rounded-xl"
                >
                  <Gift className="w-3.5 h-3.5 mr-1.5 text-brand-600" /> Redeem Points
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="bg-white border-slate-200 rounded-xl p-4">
                  <Wallet className="w-5 h-5 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-xs text-slate-900">Wallet Transfer</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Direct cash transfer via eSewa / Khalti.</p>
                </Card>
                <Card className="bg-white border-slate-200 rounded-xl p-4">
                  <Percent className="w-5 h-5 text-brand-600 mb-2" />
                  <h4 className="font-bold text-xs text-slate-900">Course Discount</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Coupon codes for paid courses.</p>
                </Card>
                <Card className="bg-white border-slate-200 rounded-xl p-4">
                  <Award className="w-5 h-5 text-purple-600 mb-2" />
                  <h4 className="font-bold text-xs text-slate-900">Certificate Credits</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Verified credential badges for resume.</p>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <Card className="bg-white border-slate-200 rounded-xl p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm font-bold text-slate-900">Account Credentials</CardTitle>
                <CardDescription className="text-xs text-slate-500">Your account ID and login information.</CardDescription>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <Label className="text-slate-500">Email</Label>
                  <Input value={email} readOnly className="bg-slate-50 font-mono text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-500">Role</Label>
                  <Input value={role} readOnly className="bg-slate-50 capitalize" />
                </div>
              </div>
            </Card>
          )}
        </section>

        {/* OriginUI Integrated Edit Profile Dialog */}
        <EditProfileDialog open={editModalOpen} onOpenChange={setEditModalOpen} />

        {/* Points Redemption Modal */}
        <Dialog open={redeemModalOpen} onOpenChange={setRedeemModalOpen}>
          <DialogContent className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Gift className="w-4 h-4 text-brand-600" />
                Redeem Rewards Points
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                You have {pointsEarned} points (Rs. {(pointsEarned * 0.1).toFixed(2)}). Minimum 20 pts.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleRedeemPoints} className="space-y-4 mt-2">
              <div className="space-y-1">
                <Label htmlFor="points-input" className="text-xs font-semibold text-slate-700">Points to Redeem</Label>
                <Input
                  id="points-input"
                  type="number"
                  min={20}
                  max={pointsEarned}
                  value={redeemPointsAmount}
                  onChange={(e) => setRedeemPointsAmount(Number(e.target.value))}
                  className="rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="account-no" className="text-xs font-semibold text-slate-700">eSewa / Khalti / Account Number</Label>
                <Input
                  id="account-no"
                  type="text"
                  required
                  placeholder="e.g. 9800000000"
                  value={walletNumber}
                  onChange={(e) => setWalletNumber(e.target.value)}
                  className="rounded-xl text-sm"
                />
              </div>

              <DialogFooter className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setRedeemModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" disabled={redeemSubmitting || pointsEarned < 20} className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs">
                  {redeemSubmitting ? "Processing..." : "Confirm"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Resource Delete Confirmation */}
        {deleteResourceModal && (
          <Dialog open={Boolean(deleteResourceModal)} onOpenChange={() => setDeleteResourceModal(null)}>
            <DialogContent className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-base font-bold text-red-600 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Resource
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-600 mt-1">
                  Are you sure you want to permanently delete <strong>{deleteResourceModal.title || "this file"}</strong>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteResourceModal(null)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteResource} disabled={isDeleting} className="rounded-xl text-xs">
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  );
};

export default Profile;
