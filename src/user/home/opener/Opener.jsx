import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

// assets
import doneIcon from "./assets/icons/done.svg";
import arrow from "./assets/icons/arrow.svg";
import book from "./assets/imgs/book2.webp";
import bgImg1 from "./assets/imgs/pen2.png";

import classes from "./Opener.module.css";

export const Opener = () => {
  const { t } = useTranslation();

  return (
    <div id="opener" className={classes["wrapper"]}>
      <div data-aos="fade-up" className={classes["container"]}>
        <h1 className={classes["title"]}>
          <span className="span_bluem">{t(`openerTitleSpan`)}</span>{" "}
          {/* {t(`openerTitle`)} */}
        </h1>
        <p className={classes["descr"]}>{t(`openerDescr`)}</p>
        <div className={classes["flex"]}>
          <a href="/contact">
            <button className={classes["btn1"]}>
              {t(`startbutton`)}
              <img src={arrow} alt="arrow" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
