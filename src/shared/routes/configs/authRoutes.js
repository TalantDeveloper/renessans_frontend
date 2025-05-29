import AuthPage from "../../../auth/AuthPage/AuthPage";
import LogIn from "../../../auth/LogIn/LogIn";
import Register from "../../../auth/Register/Register";
import Roles from "../../../auth/Roles/Roles";
import AuthSelection from "../../../auth/Selection/AuthSelection";

export const authRoutes = [
  {
    text: "Login",
    path: "/auth-login",
    exact: true,
    visibleInNavbar: true,
    element: <AuthPage component={<LogIn />} />,
  },
  {
    text: "Register",
    path: "/auth-register",
    exact: true,
    visibleInNavbar: true,
    element: <AuthPage component={<Register />} />,
  },
  {
    text: "Choose Role",
    path: "/auth/choose-role",
    exact: true,
    visibleInNavbar: true,
    element: <AuthPage component={<Roles />} />,
  },
  {
    text: "Auth",
    path: "/auth",
    exact: true,
    visibleInNavbar: true,
    element: <AuthPage component={<AuthSelection />} />,
  },
];
