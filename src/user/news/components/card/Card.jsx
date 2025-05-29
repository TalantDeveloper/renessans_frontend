import React, { useEffect, useRef, useState } from "react";
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
  const [isFullNewsVisible, setIsFullNewsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [onView]);

  // Toggle full news visibility
  const handleToggleNewsVisibility = () => {
    setIsFullNewsVisible((prev) => !prev);
  };

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
            <p className={classes["text"]}>{date}</p>
          </div>
          <div className={classes["box"]}>
            <p className={classes["text"]}>
              {comments} {t("numberOfComments")}
            </p>
          </div>
          <div className={classes["box"]}>
            <p className={classes["text"]}>{views}</p>
          </div>
        </div>
        <div
          className={classes["descr"]}
          dangerouslySetInnerHTML={{
            __html: isFullNewsVisible ? descr : `${descr.slice(0, 200)}...`, // Show a portion of the description initially
          }}
        ></div>
        <button onClick={handleToggleNewsVisibility} className={classes["btn"]}>
          {isFullNewsVisible ? t("seeLessBtn") : t("newsButton")}
        </button>
      </div>
    </div>
  );
};
