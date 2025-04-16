import React from 'react';
import { LayoutDashboard, Users, BookOpen, Clock, CheckCircle, Folder, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl shadow-orange-200 shadow-lg p-8 max-w-4xl w-full">
          <h1 className="text-center text-3xl font-bold text-orange-800 mb-12 flex items-center justify-center gap-2">
            <LayoutDashboard className="w-8 h-8" />
            Admin Panel
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <AdminButton icon={Users} text="All Classrooms" link={'/admin/classroom'}/>
            <AdminButton icon={CheckCircle} text="Pending Approvals" link={'/admin/classroomrequest'} />
            <AdminButton icon={Users} text="User Details" link={'/admin/userinfo'} />
            <AdminButton icon={Folder} text="Resources" />
            <AdminButton icon={Video} text="Online Classes" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminButton = ({ icon: Icon, text,link }) => (
  <Link to={link} className="group flex flex-col items-center p-6 space-y-3 bg-orange-50/50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
      <Icon className="w-8 h-8 text-orange-600 group-hover:text-orange-800" />
    </div>
    <span className="font-semibold text-orange-800 group-hover:text-orange-900">{text}</span>
  </Link>
);

export default AdminPage;
