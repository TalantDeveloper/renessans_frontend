import React from "react";
import {useTranslation} from "react-i18next";

import {Map} from "./components/map/Map";
import {Form} from "./components/form/Form";
import {Contacts} from "./components/contact/Contact";
import Head from "../../shared/layout/head/Head";

import classes from "./index.module.css";

export const Contact = () => {
    const {t} = useTranslation();

    return (
        <div className={classes["wrapper"]}>
            <Head title="Contact"/>
            <div className={classes["container"]}>
                <h1 className={classes["header"]}>
                    {t(`contactHeader`)}
                    <span className="span_blue">{t(`contactHeaderSpan`)}</span>
                </h1>
                <p className={classes["descr"]}>{t("contactDescr")}</p>
                {/* contact */}
                <Contacts/>
                {/* send message */}
                <Form/>
            </div>
            <Map/>
        </div>
    );
};
