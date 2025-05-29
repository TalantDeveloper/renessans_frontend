import React from "react";

import LeftSide from "../LeftSide/LeftSide";
import AuthHeader from "../AuthHeader/AuthHeader";

import classes from "../AuthPage/AuthPage.module.css";

const AuthPage = ({ component }) => {
  return (
    <div className={classes["auth-wrapper"]}>
      <div className={classes["left-side"]}>
        <LeftSide />
      </div>

      <div className={classes["main-auth"]}>
        <div className={classes["auth-header"]}>
          <AuthHeader />
        </div>
        {component}
      </div>
    </div>
  );
};

export default AuthPage;
