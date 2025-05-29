import Profile from "../../../dashboard/shared/pages/profile";
import GenericPage from "../../../genericPage/GenericPage";

export const studentRoutes = [
  {
    text: "Camera",
    path: "/student/camera",
    exact: true,
    visibleInNavbar: true,
    element: <GenericPage />,
    icon: "bxs:cctv",
  },
  {
    text: "Online Library",
    path: "/student/library",
    exact: true,
    visibleInNavbar: true,
    element: <GenericPage />,
    icon: "ion:book",
  },
  {
    text: "Study Abroad",
    path: "/student/study",
    exact: true,
    visibleInNavbar: true,
    element: <GenericPage />,
    icon: "fa:plane",
  },
  {
    text: "My learnings",
    path: "/student/my-learnings",
    exact: true,
    visibleInNavbar: true,
    element: <GenericPage />,
    icon: "material-symbols:play-lesson",
  },
  {
    text: "Events",
    path: "/student/events",
    visibleInNavbar: false,
    exact: true,
    element: <GenericPage />,
  },
  {
    text: "Profile",
    path: "/student/profile",
    exact: true,
    visibleInNavbar: true,
    element: <Profile />,
    icon: "teenyicons:user-solid",
  },
];
