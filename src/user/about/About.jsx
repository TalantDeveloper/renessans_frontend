import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import flag from "./assets/imgs/main-logo.png";
import { purposeData } from "./utils/purposeData";
import { useTranslation } from "react-i18next";
import classes from "./About.module.css";

export const About = () => {
  const { t } = useTranslation();
  const currentLang = localStorage.getItem("i18nextLng");
  const navigate = useNavigate();

  return (
    <div className={classes["mainContainer"]}>
      <div className={classes["container"]}>
        <div data-aos="fade-up" className={classes["main"]}>
          <div className={classes["left"]}>
            <div className={classes["flag"]}>
              <img className={classes["flag_img"]} src={flag} />
            </div>
          </div>
          <div className={classes["right"]}>
            <h1 className={classes["header"]}>{t("about_university")}</h1>
            <p className={classes["about_olmazor"]}>{t("historyofAlmazar")}</p>
            <div className={classes["socials"]}>
              <div className={classes["all"]}>
                <a target="_blank" href="tel: +998712073142">
                  <div className={classes["phone"]}>
                    <Icon
                      className={classes["icon"]}
                      icon={"solar:phone-linear"}
                    />
                    <p>+998712073142</p>
                  </div>
                </a>
                <a target="_blank" href="mailto: digitalolmazor@gmail.com">
                  <div className={classes["mail"]}>
                    <Icon className={classes["icon"]} icon={"tabler:mail"} />
                    <p>{t("emailOfAbout")}</p>
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/Olmazor+District+Khokimiyat/@41.3505431,69.223995,15z/data=!4m2!3m1!1s0x0:0x8db65df12b48409c?sa=X&ved=2ahUKEwjdideZ38OCAxWpExAIHVZHClwQ_BJ6BAgkEAA"
                >
                  <div className={classes["location"]}>
                    <Icon
                      className={classes["icon"]}
                      icon={"akar-icons:location"}
                    />
                    <p>{t("locationOfAbout")}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className={classes["maqsad"]}>
          <div className={classes["cards"]}>
            <div className={classes["first_"]}>
              {purposeData.map((value, index) => {
                return (
                  <div
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    key={value.id}
                    className={classes["card1"]}
                  >
                    <div className={classes["h3_dv"]}>
                      <div className={classes["dv"]}></div>
                      <h3 className={classes["title"]}>
                        {value[currentLang].title}
                      </h3>
                    </div>
                    <p className={classes["descr"]}>
                      {value[currentLang].descr}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sidebar}>
        <h3>{t("university")}</h3>
        <ul>
          <li className={classes.active} onClick={() => navigate("/about")}>
            <span className={classes.icon}>▶</span>
            {t("about_university")}
          </li>
          <li onClick={() => navigate("/management")}>{t("management")}</li>
          <li onClick={() => navigate("/structure")}>{t("structure")}</li>
          <li onClick={() => navigate("/international-cooperation")}>
            {t("international_cooperation")}
          </li>
          <li onClick={() => navigate("/faculty-kafedra")}>{t("faculties")}</li>
          <li onClick={() => navigate("/anons")}>{t("events")}</li>
          <li
            onClick={() => navigate("/statistics")}
            className={classes.dropdownToggle}
          >
            {t("statistics")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
