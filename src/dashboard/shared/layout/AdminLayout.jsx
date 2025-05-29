import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./topBar/TopBar";
import Pages from "../../../shared/routes/Pages";
import axios from "axios";

import classes from "./AdminLayout.module.css";

const AdminLayout = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://127.0.0.1:8008/users/info/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUser({
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            userImage: response.data.user_image,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [authToken]);

  return (
    <div className={classes["dashboard-page"]}>
      <Sidebar routes={routes} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className={classes["bg"]}></div>
      )}
      <div className={classes["main-part"]}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
        <div className={classes["pages-wrapper"]}>
          <Pages />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
