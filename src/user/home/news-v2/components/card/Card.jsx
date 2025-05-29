import React, { useEffect, useRef } from "react";
import user from "../../assets/icons/user.svg";
import comment from "../../assets/icons/comment.svg";
import calendar from "../../assets/icons/calendar.svg";
import arrow from "../../assets/icons/arrow.svg";
import { useTranslation } from "react-i18next";
import { BiCategory } from "react-icons/bi";
import classes from "./Card.module.css";

export const NewsCard = ({
  img,
  name,
  date,
  comments,
  views,
  title,
  descr,
  link,
  onView,
}) => {
  const { t } = useTranslation();
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView(); // Trigger view count update
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the card is visible
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [onView]);

  return (
    <div ref={cardRef} data-aos="fade-up" className={classes["card_container"]}>
      <h1 className={classes["title"]}>{title}</h1>
      <img className={classes["card_img"]} src={img} alt="card_img" />
      <div className={classes["wrap"]}>
        <div className={classes["flex"]}>
          <div className={classes["box"]}>
            <BiCategory style={{ color: "#007aff", fontSize: "23px" }} />
            <p className={classes["text"]}>{name}</p>
          </div>
          <div className={classes["box"]}>
            <img src={calendar} alt="calendar" />
            <p className={classes["text"]}>{date}</p>
          </div>
          <div className={classes["box"]}>
            <img src={comment} alt="comment" />
            <p className={classes["text"]}>
              {comments} {t("numberOfComments")}
            </p>
          </div>
          <div className={classes["box"]}>
            <img src={user} alt="views" />
            <p className={classes["text"]}>{views}</p>
          </div>
        </div>
        <div
          className={classes["descr"]}
          dangerouslySetInnerHTML={{ __html: descr }}
        ></div>
      </div>
    </div>
  );
};
