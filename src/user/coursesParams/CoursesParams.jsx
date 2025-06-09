import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import CoursesParamsCards from "./components/coursesParamsCards/CoursesParamsCards";
import {coursesData} from "../courses/utils/coursesData";

import classes from "./CoursesParams.module.css";

export const CoursesParams = () => {
    const {t} = useTranslation();
    const [oneData, setOneData] = useState({});
    const {courseCategoryId} = useParams();

    useEffect(() => {
        // data
        const filtered = coursesData.filter((value) => {
            const nameCheck = value.source.toLocaleLowerCase();
            return nameCheck === courseCategoryId;
        });

        setOneData(filtered[0]);
    }, []);
    console.log(oneData, courseCategoryId);
    return (
        <div className={classes["wrapper"]}>
            <div className={classes["container"]}>
                <h1 className={classes["header"]}>
                    <span className="span_blue">{oneData?.source}</span> {oneData?.title}{" "}
                    {t(`courseHeader`)}
                </h1>
                <p className={classes["descr"]}>
                    {oneData?.descr}
                    {t("courseDescription")}
                </p>
                {/* cards */}
                <div className={classes["flex"]}>
                    {oneData?.courses?.map((value, index) => {
                        return (
                            <CoursesParamsCards
                                key={value.id}
                                index={index}
                                courseName={value.courseName}
                                descr={value.descr}
                                duration={value.duration}
                                level={value.level}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CoursesParams;
