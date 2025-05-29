import React from "react";
import { useTranslation } from "react-i18next";

import img from "../../assets/skillShare.webp";

import classes from "./Observation.module.css";

const Observation = () => {
  const { t } = useTranslation();
  return (
    <div id="control">
      <div className={classes["observation"]}>
        <div className={classes["container"]}>
          <div className={classes["obsTitle"]}>
            <h1>
              <span className="span_blue">{t("observTitle")}</span>
              {t("observTitleSpan")}
            </h1>
            <p>{t(`observDescr`)}</p>
          </div>
          <div data-aos="zoom-out-up" className={classes["obsTitle"]}>
            <img src={img} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observation;
