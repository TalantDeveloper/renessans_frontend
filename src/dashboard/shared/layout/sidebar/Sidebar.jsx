import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Turn } from "hamburger-react";
import axios from "axios";

import classes from "./Sidebar.module.css";

import logo from "../../../../shared/assets/images/logo.png";

const Sidebar = ({ routes, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/auth-login");
      return;
    }

    axios
      .post("https://sayt.renessans-edu.uz/users/logout/", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error(
            "Access token expired or invalid. Attempting to refresh..."
          );
        } else {
          console.error("Error during logout:", error);
        }
      })
      .finally(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth-login");
        setIsOpen(false);
      });
  };

  const active = ({ isActive }) => {
    return {
      borderLeft: isActive
        ? "5px solid var(--primary-color)"
        : "5px solid var(--bg-white-color)",
      color: isActive ? "var(--primary-color)" : "var(--txt-dark-grey-color)",
    };
  };

  return (
    <div
      style={isOpen ? { left: "0px" } : { left: "-100%" }}
      className={classes["sidebar"]}
    >
      <div className={classes["sidebar-header"]}>
        <div className={classes["hamburger"]}>
          <Turn toggle={setIsOpen} toggled={isOpen} />
        </div>
        <img className={classes["logo"]} src={logo} alt="logo" />
      </div>
      <div className={classes["sidebar-items"]}>
        {routes.map((item, index) => {
          return (
            item.visibleInNavbar && (
              <NavLink
                style={active}
                className={classes["item"]}
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <Icon width={"22px"} icon={item.icon} /> {item.text}
              </NavLink>
            )
          );
        })}
        <div
          style={{ marginLeft: "6px", cursor: "pointer" }}
          className={classes["item"]}
          onClick={handleLogout}
        >
          <Icon width={"22px"} icon={"solar:exit-bold"} />
          Log out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
