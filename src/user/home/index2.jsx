import React from "react";
import Head from "../../shared/layout/head/Head";
import Hackathon from "../../user/home/hackathon/Hackathon";

import {Statistic} from "./statistic/Statistic";
import {Partnership} from "./partnership/Partnership";
import {NewsSection} from "./news-v2/NewsSection";
import {Advantage} from "./advantage/Advantage";
import Events from "./events/Events";
import SchoolSlider from "./schools/Schools";
import Interaktiv from "./interaktiv/Interaktiv";
import SmCourses from "../home/smcourses/SmCourses";
import {Opener2} from "./opener/Opener2";

export const Home2 = () => {
    return (
        <div>
            <Head title="Renessans ta'lim universiteti"/>
            <Opener2/> {/* Renessans ta'lim universiteti */}
            <Statistic/> {/* Renessans ta'lim universiteti raqamlarda */}
            {/* <Interaktiv /> */}
            <NewsSection/> {/* Universitet faoliyatidagi yangiliklar */}
            <div id="eventsSection">
                <Events/> {/* E'lonlar */}
            </div>
            <Advantage/> {/* Bizning ustun jihatlarimiz */}
            <SchoolSlider/> { /*Renessans ta'lim universitetining litsenziyasi haqiqiy va chegaralanmagan */}
            <SmCourses/> { /* Top yo'nalishlar */}
            <Partnership/> {/* Bizning hamkorlarimiz */}
        </div>
    );
};
