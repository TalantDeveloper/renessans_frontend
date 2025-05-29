import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

import ImageDragZone from "./ImageDragZone";
import UserImg from "./profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";

import classes from "./UserCard.module.css";

const UserCard = ({ userData }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(userData.firstName ?? "");
  const [lastName, setLastName] = useState(userData.lastName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber ?? "");
  const [gmail, setGmail] = useState(userData.gmail ?? "");
  const [userImage, setUserImage] = useState(userData.userImage ?? "");
  const [errors, setErrors] = useState({});

  const authToken = localStorage.getItem("authToken");

  const handleSaveChanges = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      email: gmail,
    };

    try {
      const response = await axios.put(
        "http://127.0.0.1:8008/users/info/",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success(t("Muvaffaqiyatli tahrirlandi!"));
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className={classes["user-card"]}>
      <img className={classes["user-image"]} src={UserImg} alt="user-profile" />
      <div className={classes["input-col"]}>
        <label className={classes["input-label"]} htmlFor="firstName">
          {t("First name")}
          <input
            className={classes["input"]}
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.first_name && (
            <p className={classes["error-text"]}>{t(errors.first_name[0])}</p>
          )}
        </label>
        <label className={classes["input-label"]} htmlFor="lastName">
          {t("Last name")}
          <input
            className={classes["input"]}
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.last_name && (
            <p className={classes["error-text"]}>{t(errors.last_name[0])}</p>
          )}
        </label>
      </div>

      <div className={classes["input-col"]}>
        <label className={classes["input-label"]} htmlFor="phoneNumber">
          {t("Phone Number")}
          <input
            className={classes["input"]}
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phone && (
            <p className={classes["error-text"]}>{t(errors.phone[0])}</p>
          )}
        </label>
        <label className={classes["input-label"]} htmlFor="gmail">
          {t("Gmail")}
          <input
            className={classes["input"]}
            name="gmail"
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          {errors.email && (
            <p className={classes["error-text"]}>{t(errors.email[0])}</p>
          )}
        </label>
      </div>

      <div className={classes["save-button"]} onClick={handleSaveChanges}>
        {t("Save Changes")}
      </div>
    </div>
  );
};

export default UserCard;
