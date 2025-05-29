import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import classes from "./PublishCars.module.css";

export const PublishCard = ({
  img,
  title,
  grade,
  usage,
  type,
  pdfLink,
  index,
}) => {
  const { t } = useTranslation();
  return (
    <div
      data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
      className={classes["card-box"]}
    >
      <img className={classes["img"]} src={img} alt="" />
      <div className={classes["text-box"]}>
        <p className={classes["title"]}>{title}</p>
        <p className={classes["text"]}>{type}</p>
        <div className={classes["flex"]}>
          <Icon className={classes["icon"]} icon={"material-symbols:star"} />

          <p className={classes["text"]}>
            {t("downloaded")} {usage}
          </p>
        </div>
        <a target="_blank" href={pdfLink}>
          <button className={classes["btn"]}>
            <p>{t("downloadBook")}</p>
          </button>
        </a>
      </div>
    </div>
  );
};

export default PublishCard;
