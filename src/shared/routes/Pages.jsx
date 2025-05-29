import React, { Suspense, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { routes } from "./configs/routes";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={route.element}
              exact={route?.exact ?? false}
              key={route.path}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default Pages;
