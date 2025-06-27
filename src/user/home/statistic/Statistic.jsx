import React, {useEffect, useState} from "react";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

import classes from "./Statistic.module.css";
import ParticlesConfig from "../../../shared/components/particles/particles-config";
import { testUrl } from "../BaseData";

export const Statistic = () => {
    const {t} = useTranslation();
    const currentLang = localStorage.getItem("i18nextLng");
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(
                    testUrl + "/api/statistics/"
                );
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchData();
    }, []);

    const getLocalizedName = (item) => {
        switch (currentLang) {
            case "uz":
                return item.name_uz;
            case "ru":
                return item.name_ru;
            case "en":
                return item.name_en;
            default:
                return item.name_uz;
        }
    };

    return (
        <div id="statistic" className={classes["wrapper"]}>
            <ParticlesConfig idName={"statistic_tsparticles"}/>
            <div className={classes["container"]}>
                <h1 className={classes["header"]}>{t(`numbersDistrict`)}</h1>
                <h1 className={classes["descr"]}>{t(`numbersDescr`)}</h1>
                <div className={classes["flex"]}>
                    {statistics.map((item) => {
                        const isPercentage =
                            item.number.includes("%") ||
                            getLocalizedName(item).toLowerCase().includes("ilmiy salohiyat");
                        const displayNumber = isPercentage
                            ? item.number.includes("%")
                                ? item.number
                                : `${item.number}%`
                            : `${item.number}`;

                        return (
                            <div
                                data-aos="fade-down"
                                className={classes["box"]}
                                key={item.id}>
                                <h3 className={classes["title"]}>
                                    <CountUp
                                        end={parseInt(item.number)}
                                        duration={parseInt(item.number) > 500 ? 5 : 15}/>
                                    {isPercentage ? "%" : " "}
                                </h3>
                                <p className={classes["text"]}>{getLocalizedName(item)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
