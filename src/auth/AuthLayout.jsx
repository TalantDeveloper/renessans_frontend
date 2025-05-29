import React from "react";
import { Routes, Route } from "react-router-dom";

import { authRoutes } from "../shared/routes/configs/authRoutes";

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        {authRoutes.map((route) => {
          return <Route exact path={route.path} element={route.element} />;
        })}
      </Routes>
    </div>
  );
};

export default AuthLayout;
