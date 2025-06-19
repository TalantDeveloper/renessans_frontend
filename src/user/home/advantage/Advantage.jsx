import React, { useState } from "react";
import {Icon} from "@iconify/react";
import {useTranslation} from "react-i18next";
// import {advantageCard} from "./utils/advantageData";
import { testUrl } from "../BaseData";
import classes from "./Advantage.module.css";
import axios from "axios";
import { useEffect} from "react";



export const Advantage = () => {
    const {t} = useTranslation();
    const currentLang = localStorage.getItem("i18nextLng");
    const [advantages, setAdvantages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {i18n } = useTranslation();

    useEffect(() => {
        setLoading(true);
        setError(null);
    
        axios.get(testUrl + "api/advantage/")
            .then((response) => {
                setAdvantages(response.data || []);
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [i18n.language]);

    console.log(currentLang);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="advantage" className={classes["containers"]}>
            <h1 className={classes["start"]}>
                {t(`advantageTitle`)}
                <span className={"span_blue"}>{t(`advantageTitleSpan`)}</span>
            </h1>
            <div className={classes["row"]}>
                {advantages && advantages.map((value, index) => (
                    <div
                        key={value.id}
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                        className={classes["service"]}>
                        <div className={classes["circle"]}>
                            <Icon className={classes["icon"]} icon={value.icon_name}/>
                        </div>
                        <h2>{value[`title_${currentLang}`]}</h2>
                        <p>{value[`descr_${currentLang}`]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Advantage;
