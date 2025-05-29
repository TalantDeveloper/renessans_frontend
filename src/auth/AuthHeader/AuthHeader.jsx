import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import logo from "../../shared/assets/images/logo.png";

import classes from "./AuthHeader.module.css";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={classes["top-wrapper"]}>
      <img className={classes["logo"]} src={logo} alt="logo" />
      <div onClick={() => navigate("/")} className={classes["back-button"]}>
        Qaytish
        <Icon icon="icon-park-solid:back" />
      </div>
    </div>
  );
};

export default AuthHeader;
