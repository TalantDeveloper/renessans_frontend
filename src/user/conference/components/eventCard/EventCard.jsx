import React from "react";
import { Icon } from "@iconify/react";

import classes from "./EventCard.module.css";
import { useTranslation } from "react-i18next";

const EventCard = ({ extraCurricular, index, onClickOpenModal }) => {
  const { t } = useTranslation();
  console.log(extraCurricular);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace("/", ".")
      .replace("/", ".");
  };

  return (
    <div
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      className={classes["box"]}
    >
      <h3 className={classes["title"]}>
        {extraCurricular[`title_${t("language")}`]}
      </h3>
      <p className={classes["text"]}>
        {extraCurricular[`description_${t("language")}`]}
      </p>
      <br />
      <div className={classes["flex"]}>
        <Icon className={classes["icon"]} icon="ic:outline-date-range" />
        <p className={classes["text"]}>
          {t("eventsData")} {formatDate(extraCurricular.date)}
        </p>
      </div>
      <div className={classes["flex"]}>
        <Icon className={classes["icon"]} icon="ic:outline-location-on" />
        <p className={classes["text"]}>
          {t("location")}: {extraCurricular.location}
        </p>
      </div>
      <button
        onClick={() => onClickOpenModal(extraCurricular)}
        className={classes["btn"]}
      >
        {t("register")}
      </button>
      <div className={classes["number"]}>0{index + 1}</div>
    </div>
  );
};

export default EventCard;
