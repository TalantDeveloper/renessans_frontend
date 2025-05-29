import React from "react";

import Courses from "./components/CourseMain/Courses";
import Observation from "./components/Observation/Observation";
import Manner from "./components/Manner/Manner";
import Question from "./components/Question/Question";
import About from "./components/About/About";
import Head from "../../shared/layout/head/Head";
import Team from "./components/Team/Team";

const CoursesPage = () => {
  return (
    <div>
      <Head title={"Courses"} />
      <Courses />
      {/* <Observation /> */}
      {/* <Team /> */}
      <Manner />
      {/* <Question /> */}
      {/* <About /> */}
    </div>
  );
};

export default CoursesPage;
