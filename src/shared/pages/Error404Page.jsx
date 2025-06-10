import React from "react";
import LottieView from "lottie-react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classes from "./Error404Page.module.css";

import Error404Animation from "../assets/animated-placeholders/Error404.json";

const Error404Page = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className={classes["error-page"]}>
            <LottieView className={classes["animation"]}
                animationData={Error404Animation}
                loop={true}
            />
            <p className={classes["title"]}>
                {t("sorry")}

            </p>
            <p className={classes["description"]}>
                {t("back_main")}

            </p>
            <div onClick={() => navigate("/")} className={classes["button"]}>
                {t("main_menu")}
            </div>
        </div>
    );
};

export default Error404Page;
