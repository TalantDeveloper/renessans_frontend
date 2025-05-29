import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { advantageCard } from "./utils/advantageData";

import classes from "./Advantage.module.css";

export const Advantage = () => {
  const { t } = useTranslation();
  const currentLang = localStorage.getItem("i18nextLng");

  console.log(currentLang);
  return (
    <div id="advantage" className={classes["containers"]}>
      <h1 className={classes["start"]}>
        {t(`advantageTitle`)}
        <span className={"span_blue"}>{t(`advantageTitleSpan`)}</span>
      </h1>
      <div className={classes["row"]}>
        {advantageCard.map((value, index) => {
          return (
            <div
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={classes["service"]}
            >
              <div className={classes["circle"]}>
                <Icon className={classes["icon"]} icon={value.icon_name} />
              </div>
              <h2>{value[currentLang].title}</h2>
              <p>{value[currentLang].descr}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Advantage;
