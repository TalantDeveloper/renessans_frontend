import React, { useEffect } from "react";
import Head from "../../shared/layout/head/Head";
import Hackathon from "../../user/home/hackathon/Hackathon";
import { Opener } from "./opener/Opener";
import { Statistic } from "./statistic/Statistic";
import { Partnership } from "./partnership/Partnership";
import { NewsSection } from "./news/NewsSection";
import { Advantage } from "./advantage/Advantage";
import Events from "./events/Events";
import SchoolSlider from "./schools/Schools";
import Interaktiv from "./interaktiv/Interaktiv";
import SmCourses from "../home/smcourses/SmCourses";
import Syllabus from "../syllabus/Syllabus";
import axios from "axios";
import { BaseURL } from "./BaseData";

export const Home = () => {
  useEffect(() => {
    axios
      .get(
        BaseURL + "user/")
      .then((response) => {
        console.log("Data fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Head title="Renessans ta'lim universiteti" />
      <Opener />
      <Hackathon />
      <Advantage />
      <SchoolSlider />
      <SmCourses />
      <Statistic />
      <Interaktiv />
      {/* <Anons /> */}
      <NewsSection />
      <Events />
      <Partnership />
    </div>
  );
};
