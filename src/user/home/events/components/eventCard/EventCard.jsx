import React, { useState } from "react";
import { Icon } from "@iconify/react";
import classes from "./EventCard.module.css";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import moment from "moment";
import "moment/locale/uz-latn";

const EventCard = ({ extraCurricular, index, onClickOpenModal }) => {
  const { t, i18n } = useTranslation(); // i18n gives access to current language
  const [isExpanded, setIsExpanded] = useState(false);

  moment.locale(i18n.language || "uz-latn"); // Ensure locale is set to the current language

  // Function to truncate text
  const truncateText = (text, limit) => {
    if (!text || typeof text !== "string") return "";
    const words = text.split(" ");
    if (words.length > limit) {
      return `${words.slice(0, limit).join(" ")}...`;
    }
    return text;
  };

  

  const title =
    extraCurricular[`title_${i18n.language}`] || extraCurricular.title_uz;
  const fullAnnouncement =
    extraCurricular[`full_announcement_${i18n.language}`] ||
    extraCurricular.full_announcement_uz;

  const contentToDisplay = isExpanded
    ? fullAnnouncement
    : truncateText(fullAnnouncement, 75);

  return (
    <div
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      className={classes["box"]}
    >
      <h3 className={classes["title"]}>{title}</h3>
      <p>
        <ReactQuill
          className={classes["ourEditor"]}
          value={contentToDisplay}
          readOnly={true}
          theme="bubble"
        />
      </p>
      {!isExpanded && fullAnnouncement.split(" ").length > 200 && (
        <button
          onClick={() => setIsExpanded(true)}
          className={classes["seeMoreBtn"]}
        >
          {t(`eventsData.showMore`)}
        </button>
      )}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className={classes["seeMoreBtn"]}
        >
          {t(`eventsData.showLess`)}
        </button>
      )}
      <br />
      <div className={classes["flex"]}>
        <Icon className={classes["icon"]} icon="ic:outline-date-range" />
        <p className={classes["text"]}>
        {t("event_date")}
          
          {moment(extraCurricular.holding_date)
            .locale(i18n.language || "uz-latn")
            .format("DD-MMMM, HH:mm")}
        </p>
      </div>
      {/* {extraCurricular.is_main && (
        <button
          onClick={() => onClickOpenModal(extraCurricular.title)}
          className={classes["btn"]}
        >
          {t(`Qo'shilish`)}
        </button>
      )} */}
      <div className={classes["number"]}>0{index + 1}</div>
    </div>
  );
};

export default EventCard;
