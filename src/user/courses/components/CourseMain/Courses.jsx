import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { coursesData } from "../../utils/coursesData";

import classes from "./Courses.module.css";

const Courses = () => {
  const { t } = useTranslation();

  return (
    <div id="category">
      <div className={classes["courses"]}>
        <div className={classes["container"]}>
          <div className={classes["courseMain"]}>
            <div className={classes["courseTitle"]}>
              <h1>
                {t("courseTitle")}{" "}
                <span className="span_blue">{t("courseTitleSpan")}</span>
              </h1>
              <p>{t(`courseDescr`)}</p>
            </div>
            <div className={classes["saralsh"]}>
              <select>
                <option value="age">{t(`ageSort`)}</option>
                <option value="name">{t(`onCourse`)}</option>
              </select>
            </div>
            <div className={classes["courseCards"]}>
              {coursesData.map((value, index) => {
                return (
                  <div
                    style={{ borderColor: value.color }}
                    key={value.id}
                    data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                    className={classes["cardSub"]}
                  >
                    <img
                      className={classes["courseLogo"]}
                      src={value.img}
                      alt=""
                    />
                    <h1>{value.title}</h1>
                    <p>
                      {t(`courseValue`)}
                      {value.source}
                    </p>
                    <div className={classes["doubleP"]}>
                      <p>
                        {t(`courseNum`)} {value.courseNumber}
                      </p>
                      <Link to={`/course/${value.source.toLowerCase()}`}>
                        {t(`moreBtn`)}
                      </Link>
                    </div>
                    <div className={classes["status"]}>
                      <p>{value.lang}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
