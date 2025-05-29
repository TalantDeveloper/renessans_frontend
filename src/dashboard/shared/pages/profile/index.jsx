import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import UserCard from "./components/UserCard";

import classes from "./index.module.css";

const Profile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("https://sayt.renessans-edu.uz/users/info/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUserData({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          phoneNumber: response.data.phone,
          gmail: response.data.email,
          userImage: response.data.user_image, // Assuming the correct image field
          role: response.data.role,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [authToken]);

  const handleEdit = (updatedData) => {
    // Include all required fields in the updatedData object
    const { firstName, lastName, phoneNumber, gmail } = updatedData;

    const requestData = {
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      email: gmail,
    };

    axios
      .put("https://sayt.renessans-edu.uz/users/update/", requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("User info updated successfully");
        setUserData((prevData) => ({
          ...prevData,
          firstName,
          lastName,
          phoneNumber,
          gmail,
        }));
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
      });
  };

  if (!userData) {
    return <p>{t("Loading...")}</p>;
  }

  return (
    <div>
      <p className={classes["page-title"]}>{t("Profile")}</p>
      <UserCard userData={userData} onSave={handleEdit} />
    </div>
  );
};

export default Profile;
