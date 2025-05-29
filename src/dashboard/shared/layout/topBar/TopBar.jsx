import React from "react";
import { useNavigate } from "react-router-dom";
import { Turn } from "hamburger-react";

import classes from "./TopBar.module.css";
import DefaultUserImage from "./profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
import LanguageDropDownComponent from "../../../../shared/components/languageDropdown/LanguageDropDownComponent";

const TopBar = ({ isOpen, setIsOpen, user }) => {
  const navigate = useNavigate();

  return (
    <div className={classes["top-bar"]}>
      <div className={classes["hamburger"]}>
        <Turn toggle={setIsOpen} toggled={isOpen} />
      </div>

      <div className={classes["right-side"]}>
        <LanguageDropDownComponent />

        <div
          onClick={() => navigate("/admin/profile")}
          className={classes["user-info"]}
        >
          <div className={classes["user-image-wrapper"]}>
            <img
              className={classes["user-image"]}
              src={user?.userImage || DefaultUserImage}
              alt="user-image"
            />
            <div className={classes["user-online"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
