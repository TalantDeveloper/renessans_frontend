import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./CoursesParamsCards.module.css";

export const CoursesParamsCards = ({
  courseName,
  descr,
  duration,
  level,
  index,
}) => {
  const { t } = useTranslation();
  return (
    <div
      data-aos={index % 2 ? "fade-left" : "fade-right"}
      className={classes["card_box"]}
    >
      <p className={classes["title"]}>{courseName}</p>
      <p className={classes["descr"]}>{descr}</p>
      <div className={classes["flex"]}>
        <Icon className={classes["icons"]} icon="game-icons:duration" />
        <p className={classes["text"]}>
          {t("duration")} {duration}
        </p>
      </div>
      <div className={classes["flex"]}>
        <Icon className={classes["icons"]} icon="icon-park-outline:level" />
        <p className={`${classes["text"]} ${classes["duration"]}`}>
          {t("level")}
          {level}
        </p>
      </div>
      <Link to={`${courseName}`}>
        <button className={classes["btn"]}>
          <p>{t(`start`)}</p>
        </button>
      </Link>
      <div className={classes["number"]}>{index + 1}</div>
    </div>
  );
};

export default CoursesParamsCards;
