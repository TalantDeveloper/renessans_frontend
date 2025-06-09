import React from "react";
import {ReactComponent as Phone} from "../../assets/icons/phone.svg";
import {ReactComponent as Email} from "../../assets/icons/email.svg";
import {ReactComponent as Location} from "../../assets/icons/location.svg";

import classes from "./Contact.module.css";
import {useTranslation} from "react-i18next";

export const Contacts = () => {
    const {t} = useTranslation();
    return (
        <div data-aos="fade-down" className={classes["section"]}>
            {/* phone */}
            <div className={classes["box"]}>
                <div className={classes["circle"]}>
                    <Phone className={classes["icon"]}/>
                </div>
                <div className={classes["flex"]}>
                    <p className={classes["title"]}>{t("contactPhoneNum")}</p>
                    <a target="_blank" href="tel: +998555067007">
                        <p className={classes["text"]}>(55) 506 70 07</p>
                    </a>
                </div>
            </div>
            {/* email */}
            <div className={classes["box"]}>
                <div className={classes["circle"]}>
                    <Email className={classes["icon"]}/>
                </div>
                <div className={classes["flex"]}>
                    <p className={classes["title"]}>{t("emailAdress")}</p>
                    <a target="_blank" href="mailto: renessans-edu@gmail.com">
                        <p className={classes["text"]}>info@renessans-edu.uz</p>
                    </a>
                </div>
            </div>
            {/* location */}
            <div className={classes["box"]}>
                <div className={classes["circle"]}>
                    <Location className={classes["icon"]}/>
                </div>
                <div className={classes["flex"]}>
                    <p className={classes["title"]}>{t(`locationContact`)}</p>
                    <a target="_blank" href="https://maps.app.goo.gl/mUzmyrNLCTa3AJck9">
                        <p className={classes["text"]}>
                            {t("mapBr1")} <br/>
                            {t("mapBr")}
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};
