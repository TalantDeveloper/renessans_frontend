import React from "react";
import { Navigate } from "react-router-dom";
import CourseLayout from "../../../dashboard/admin/courses/CourseLayout";
import { NewsAdmin } from "../../../dashboard/admin/news/NewsAdmin";
import OnlineLibery from "../../../dashboard/shared/layout/OnlineLibery/OnlineLibery";
import LibRaryClass from "../../../dashboard/shared/layout/OnlineLibery/components/LibraryCard/LibraryCard";
import Profile from "../../../dashboard/shared/pages/profile";
import GenericPage from "../../../genericPage/GenericPage";
import VideoCamer from "../../../dashboard/admin/cameras/VideoCamera";
import Faculty from "../../../dashboard/admin/faculty/Faculty";
import Students from "../../../dashboard/admin/students/Students";
import Events from "../../../dashboard/admin/events/Events";
import Announcements from "../../../dashboard/admin/announcement/Announcement";
import Laboratory from "../../../dashboard/admin/laboratory/Laboratory";
import Union from "../../../dashboard/admin/union/Union";
import Partners from "../../../dashboard/admin/partners/Partners";
import Staff from "../../../dashboard/admin/staff/Staff";
import Statistics from "../../../dashboard/admin/statistics/Statistics";
import Conference from "../../../dashboard/admin/conference/Conference";
import Journal from "../../../dashboard/admin/journal/Journal";
import StudentsLife from "../../../dashboard/admin/studentsLife/StudentsLife";
import PageCreate from "../../../dashboard/admin/pagecreate/PageCreate";

const isAuthenticated = () => !!localStorage.getItem("authToken");

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth-login" replace />;
};

export const adminRoutes = [
  {
    text: "Dashboard",
    path: "/admin",
    exact: false, // Don't use exact here to match sub-paths as well
    visibleInNavbar: false,
    icon: "material-symbols:dashboard",
    element: <PrivateRoute element={<GenericPage />} />,
  },
  {
    text: "Yangiliklar",
    path: "/admin/news",
    visibleInNavbar: true,
    icon: "material-symbols:news",
    element: <PrivateRoute element={<NewsAdmin />} />,
  },
  {
    text: "Talabalar",
    path: "/admin/students",
    visibleInNavbar: true,
    icon: "ion:book",
    element: <PrivateRoute element={<Students />} />,
  },
  {
    text: "Fakultetlar",
    path: "/admin/faculty",
    visibleInNavbar: true,
    icon: "fa-solid:graduation-cap",
    element: <PrivateRoute element={<Faculty />} />,
  },
  {
    text: "Tadbirlar",
    path: "/admin/events",
    visibleInNavbar: true,
    icon: "fa6-solid:calendar",
    element: <PrivateRoute element={<Events />} />,
  },
  {
    text: "E'lonlar",
    path: "/admin/announcements",
    visibleInNavbar: true,
    icon: "ri:team-fill",
    element: <PrivateRoute element={<Announcements />} />,
  },
  {
    text: "Laboratoriya",
    path: "/admin/laboratory",
    visibleInNavbar: true,
    icon: "fa6-solid:laptop-code",
    element: <PrivateRoute element={<Laboratory />} />,
  },
  {
    text: "University Union",
    path: "/admin/union",
    visibleInNavbar: true,
    icon: "fa6-solid:school",
    element: <PrivateRoute element={<Union />} />,
  },
  {
    text: "Bizning hamkorlar",
    path: "/admin/partners",
    visibleInNavbar: true,
    icon: "fa6-solid:handshake",
    element: <PrivateRoute element={<Partners />} />,
  },
  {
    text: "Rahbariyat",
    path: "/admin/staff",
    visibleInNavbar: true,
    icon: "fa6-solid:users",
    element: <PrivateRoute element={<Staff />} />,
  },
  {
    text: "Statistika",
    path: "/admin/statistics",
    visibleInNavbar: true,
    icon: "fa6-solid:chart-line",
    element: <PrivateRoute element={<Statistics />} />,
  },
  {
    text: "Konferensiya",
    path: "/admin/conference",
    visibleInNavbar: true,
    icon: "fa6-solid:school",
    element: <PrivateRoute element={<Conference />} />,
  },
  {
    text: "Jurnallar",
    path: "/admin/journals",
    visibleInNavbar: true,
    icon: "fa6-solid:book",
    element: <PrivateRoute element={<Journal />} />,
  },
  {
    text: "Sahifa qo'shish",
    path: "/admin/create-page",
    visibleInNavbar: true,
    icon: "fa6-solid:laptop-code",
    element: <PrivateRoute element={<PageCreate />} />,
  },
  {
    text: "Talabalar hayoti",
    path: "/admin/students-life",
    visibleInNavbar: true,
    icon: "fa-solid:graduation-cap",
    element: <PrivateRoute element={<StudentsLife />} />,
  },
  // {
  //   text: "Online darslar",
  //   path: "/admin/courses",
  //   visibleInNavbar: true,
  //   icon: "material-symbols:play-lesson",
  //   element: <PrivateRoute element={<CourseLayout />} />,
  // },
  // {
  //   text: "Online kutubxona",
  //   path: "/admin/library",
  //   visibleInNavbar: true,
  //   icon: "ion:book",
  //   element: <PrivateRoute element={<OnlineLibery />} />,
  // },
  {
    text: "Profile",
    path: "/admin/profile",
    visibleInNavbar: true,
    icon: "teenyicons:user-solid",
    element: <PrivateRoute element={<Profile />} />,
  },
];
