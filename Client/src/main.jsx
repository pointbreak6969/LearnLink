import React from "react";
import ReactDOM from "react-dom/client";
import "./services/api.js";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/AllCourses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import CourseLearningPage from "./pages/CourseLearningPage.jsx";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Classroom from "./pages/Classroom";
import SingleClass from "./pages/Class/SingleClass.jsx";
import Reward from "./pages/Reward";
import Protected from "./components/Protected";
import SearchClassrooms from "./pages/SearchClassrooms.jsx";
import UserAvatar from "./components/UserAvatar.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import ClassRoomAdmin from "./pages/Admin/ClassRoom.jsx";
import PendingClassroomAdmin from "./pages/Admin/ClassroomPending.jsx";
import UserManagement from "./pages/Admin/UserInfoAdmin.jsx";
// Define public routes
const publicRoutes = [
  {
    path: "/",
    element: (
      <Protected authentication={false} redirectPath="/classroom">
        <Home />
      </Protected>
    ),
  },
  { path: "/userAvatar", element: <UserAvatar /> },
  { path: "/courses", element: <Courses /> },
  { path: "/courses/:courseId", element: <CourseDetails /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/verifyotp", element: <VerifyOtp /> },
];

// Define auth routes (accessible only when logged out)
const authRoutes = [
  {
    path: "/login",
    element: (
      <Protected authentication={false} redirectPath="/classroom">
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authentication={false} redirectPath="/classroom">
        <Signup />
      </Protected>
    ),
  },
];

// Define protected routes (require authentication)
const protectedRoutes = [
  {
    path: "/profile",
    element: (
      <Protected authentication={true} userOnly={true}>
        <Profile />
      </Protected>
    ),
  },
  {
    path: "/courses/:courseId/learn",
    element: (
      <Protected authentication={true} userOnly={true}>
        <CourseLearningPage />
      </Protected>
    ),
  },
  {
    path: "/classroom",
    element: (
      <Protected authentication={true} userOnly={true}>
        <Classroom />
      </Protected>
    ),
  },
  {
    path: "/classroom/:classCode",
    element: (
      <Protected authentication={true}>
        <SingleClass />
      </Protected>
    ),
  },
  {
    path: "/searchclassrooms",
    element: (
      <Protected authentication={true} userOnly={true}>
        <SearchClassrooms />
      </Protected>
    ),
  },
  {
    path: "/reward",
    element: (
      <Protected authentication={true} userOnly={true}>
        <Reward />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <Protected authentication={true} requireSuperAdmin={true}>
        <AdminPage />
      </Protected>
    ),
  },
  {
    path: "/admin/classroom",
    element: (
      <Protected authentication={true} requireSuperAdmin={true}>
        <ClassRoomAdmin />
      </Protected>
    ),
  },
  {
    path: "/admin/classroom/:classCode",
    element: (
      <Protected authentication={true} requireSuperAdmin={true}>
        <SingleClass />
      </Protected>
    ),
  },
  {
    path: "/admin/classroomrequest",
    element: (
      <Protected authentication={true} requireSuperAdmin={true}>
        <PendingClassroomAdmin />
      </Protected>
    ),
  },
  {
    path: "/admin/userinfo",
    element: (
      <Protected authentication={true} requireSuperAdmin={true}>
        <UserManagement />
      </Protected>
    ),
  },
];

function RouteErrorBoundary() {
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-ink-100 shadow-card max-w-md w-full space-y-4">
        <h2 className="font-display text-2xl font-bold text-ink-900">Something went wrong</h2>
        <p className="text-sm text-ink-600">
          We encountered an unexpected error. Please return to the homepage or try again.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => window.location.href = "/courses"}
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Browse Courses
          </button>
          <button
            onClick={() => window.location.reload()}
            className="border border-ink-200 hover:bg-ink-50 text-ink-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [...publicRoutes, ...authRoutes, ...protectedRoutes],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
