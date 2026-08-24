import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  BookOpen,
  Folder,
  ArrowLeft,
  RefreshCw,
  UserCheck,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import adminService from "@/services/admin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClassrooms: 0,
    totalResources: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth?.userData);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPlatformStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load admin stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/70 via-white to-brand-100/40 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-brand-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-500 text-white rounded-xl shadow-md">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-ink-900">
                  Super Admin Panel
                </h1>
                <span className="text-xs uppercase tracking-wider bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-300">
                  Full Access
                </span>
              </div>
              <p className="text-sm text-ink-500 mt-0.5">
                Welcome back, <span className="font-semibold text-brand-700">{currentUser?.fullName || "Admin"}</span>. Manage your platform, classrooms, and users.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStats}
              disabled={loading}
              className="border-brand-300 hover:bg-brand-50 text-brand-700"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white">
              <Link to="/classroom" className="flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Link>
            </Button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            loading={loading}
            color="bg-blue-500"
            link="/admin/userinfo"
          />
          <StatCard
            title="Active Classrooms"
            value={stats.totalClassrooms}
            icon={GraduationCap}
            loading={loading}
            color="bg-emerald-500"
            link="/admin/classroom"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={CheckCircle}
            loading={loading}
            color="bg-amber-500"
            link="/admin/classroomrequest"
            highlight={stats.pendingRequests > 0}
          />
          <StatCard
            title="Total Resources"
            value={stats.totalResources}
            icon={Folder}
            loading={loading}
            color="bg-purple-500"
            link="/admin/classroom"
          />
        </div>

        {/* Action / Management Navigation Modules */}
        <div className="bg-white/95 backdrop-blur-sm border border-brand-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Administrative Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminModuleCard
              title="Classroom Management"
              description="View all classrooms, edit details, assign/remove co-admins, review enrolled students, or delete classrooms."
              icon={GraduationCap}
              link="/admin/classroom"
              badge={`${stats.totalClassrooms} Classrooms`}
            />

            <AdminModuleCard
              title="Student Join Requests"
              description="Review and globally approve or reject student join requests across all classrooms with single-click actions."
              icon={CheckCircle}
              link="/admin/classroomrequest"
              badge={`${stats.pendingRequests} Pending`}
              badgeColor={stats.pendingRequests > 0 ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-brand-100 text-brand-700 border-brand-300"}
            />

            <AdminModuleCard
              title="User Directory & Roles"
              description="Manage all users in LearnLink, inspect user profiles, promote/demote Super Admin privileges, and delete users."
              icon={UserCheck}
              link="/admin/userinfo"
              badge={`${stats.totalUsers} Registered`}
            />
          </div>
        </div>

        {/* Superadmin System Banner */}
        <div className="p-4 bg-brand-100/70 border border-brand-200 rounded-xl text-sm text-brand-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>Super Admin Privilege Active:</strong> You have master access to modify any classroom, manage all student requests, and control user access across the system.
          </div>
          <Button asChild variant="link" className="text-brand-700 hover:text-brand-900 p-0 h-auto">
            <Link to="/courses">Explore All Courses →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, loading, color, link, highlight }) => (
  <Link
    to={link}
    className={`block p-5 bg-white rounded-2xl border transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
      highlight ? "border-amber-300 ring-2 ring-amber-100" : "border-brand-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{title}</p>
        <div className="text-3xl font-extrabold text-ink-900 mt-1">
          {loading ? (
            <div className="h-8 w-16 bg-brand-100 animate-pulse rounded"></div>
          ) : (
            value
          )}
        </div>
      </div>
      <div className={`p-3 rounded-xl text-white ${color} shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </Link>
);

const AdminModuleCard = ({ title, description, icon: Icon, link, badge, badgeColor }) => (
  <Link
    to={link}
    className="group flex flex-col justify-between p-6 bg-brand-50/50 hover:bg-brand-100/70 border border-brand-200 hover:border-brand-400 rounded-2xl transition-all duration-300 hover:shadow-md"
  >
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white border border-brand-200 rounded-xl shadow-xs group-hover:bg-brand-500 group-hover:text-white transition-colors text-brand-600">
          <Icon className="w-7 h-7" />
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor || "bg-brand-100 text-brand-700 border-brand-300"}`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-brand-900 group-hover:text-brand-950 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-ink-600 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="mt-4 pt-3 border-t border-brand-200/60 text-xs font-semibold text-brand-700 flex items-center justify-between">
      <span>Open Module</span>
      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </Link>
);

export default AdminPage;
