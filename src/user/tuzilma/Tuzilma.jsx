import React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classes from "./Tuzilma.module.css";
import Tuzilma from "./image_2024-11-08_10-02-49.png";
import TuzilmaEng from "./structu_en.svg";
import TuzilmaRu from "./structu_ru.svg";

const TashkiliyTuzilma = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const getImage = () => {
        switch (i18n.language) {
            case "en":
                return TuzilmaEng;
            case "ru":
                return TuzilmaRu;
            default:
                return Tuzilma;
        }
    };

    return (
        <div className={classes.container}>
            <div data-aos="fade-up" className={classes["tuzilma-container"]}>
                <h1 className={classes["page-title"]}>{t("title")}</h1>
                <p className={classes["breadcrumb"]}>{t("breadcrumb")}</p>

                <div className={classes["chart-container"]}>
                    <img src={getImage()} alt="Tashkiliy Tuzilma"/>
                </div>
            </div>

            <div className={classes.sidebar}>
                <h3>{t("university")}</h3>
                <ul>
                    <li onClick={() => navigate("/about")}>{t("about")}</li>
                    <li onClick={() => navigate("/management")}>{t("management")}</li>
                    <li className={classes.active} onClick={() => navigate("/structure")}>
                        <span className={classes.icon}>▶</span>
                        {t("structure")}
                    </li>
                    <li onClick={() => navigate("/international-cooperation")}>
                        {t("internationalCooperation")}
                    </li>
                    <li onClick={() => navigate("/faculty-kafedra")}>{t("faculties")}</li>
                    <li onClick={() => navigate("/anons")}>{t("events")}</li>
                    <li onClick={() => navigate("/statistics")} className={classes.dropdownToggle}>
                        {t("statistics")}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TashkiliyTuzilma;
