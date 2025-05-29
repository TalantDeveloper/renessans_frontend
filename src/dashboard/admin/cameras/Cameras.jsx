import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Cameras.module.css";
import { useNavigate } from "react-router-dom";

const Category = ({ label, value, onClick, isActive }) => (
  <div
    className={`${classes["category"]} ${isActive ? classes.active : ""}`}
    onClick={() => onClick(value)}
  >
    <h2 className={classes["categryH2"]}>{label}</h2>
  </div>
);

const Cameras = () => {
  const { t } = useTranslation();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  const schools = [
    { id: 11, name: "SCHOOL 11" },
    { id: 23, name: "SCHOOL 23" },
    { id: 56, name: "SCHOOL 56" },
    { id: 74, name: "SCHOOL 74" },
    { id: 111, name: "SCHOOL 111" },
    { id: 249, name: "SCHOOL 249" },
    { id: 15, name: "SCHOOL 15" },
    { id: 328, name: "SCHOOL 328" },
    { id: 312, name: "SCHOOL 312" },
    { id: 12, name: "SCHOOL 12" },
    { id: 24, name: "SCHOOL 24" },
    { id: 57, name: "SCHOOL 57" },
    { id: 75, name: "SCHOOL 75" },
    { id: 112, name: "SCHOOL 112" },
    { id: 250, name: "SCHOOL 250" },
    { id: 16, name: "SCHOOL 16" },
    { id: 327, name: "SCHOOL 327" },
    { id: 311, name: "SCHOOL 311" },
    { id: 13, name: "SCHOOL 13" },
    { id: 25, name: "SCHOOL 25" },
    { id: 58, name: "SCHOOL 58" },
    { id: 76, name: "SCHOOL 76" },
    { id: 113, name: "SCHOOL 113" },
    { id: 251, name: "SCHOOL 251" },
    { id: 17, name: "SCHOOL 17" },
    { id: 326, name: "SCHOOL 326" },
  ];

  const grades = Array.from(
    { length: 11 },
    (_, index) => `${index + 1}th Grade`
  );
  const classesArray = Array.from(
    { length: 5 },
    (_, index) => `Class ${String.fromCharCode(65 + index)}`
  );

  const handleCategoryClick = (type, value) => {
    switch (type) {
      case "school":
        setSelectedSchool(value);
        setSelectedGrade(null);
        setSelectedClass(null);
        setIsVideoOpen(false);
        scrollIntoView("grades");
        break;
      case "grade":
        setSelectedGrade(value);
        setSelectedClass(null);
        setIsVideoOpen(false);
        scrollIntoView("classes");
        break;
      case "video":
        setIsVideoOpen(true);
        updateURL(
          `/admin/cameras/school/${selectedSchool || ""}/grades/${
            encodeURIComponent(selectedGrade) || ""
          }/class/${selectedClass || ""}`
        );
        scrollIntoView("video");
        break;
      default:
        break;
    }

    if (type !== "class" && type !== "video") {
      setSelectedClass(null);
    }
  };

  const scrollIntoView = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const updateURL = (newPath) => {
    window.history.pushState(null, null, newPath);
  };

  const [cameraPut, setCameraPut] = useState({
    school: "",
    grade: "",
    class: "",
  });

  useEffect(() => {
    if (cameraPut.class.includes("Class")) {
      navigate(
        `/admin/cameras/${cameraPut.school} ${cameraPut.grade} ${cameraPut.class}`
      );
    }
  }, [cameraPut]);

  return (
    <div className={classes["app-container"]}>
      <h1 className={classes["cameraTitle"]}>
        Surveillance <span className={classes["appSpan"]}>cameras in</span> all
        schools and classrooms
      </h1>
      <div
        className={classes["categoriesContainer"]}
        id="schools"
        ref={categoriesRef}
      >
        {schools.map((school) => (
          <Category
            key={school.id}
            label={school.name}
            value={school.id}
            onClick={() => {
              const sum = school.name.split(" ").join("");
              setCameraPut({ ...cameraPut, school: sum });
              handleCategoryClick("school", school.id);
            }}
            isActive={school.id === selectedSchool}
          />
        ))}
      </div>
      {selectedSchool && (
        <div
          className={classes["categoriesContainer"]}
          id="grades"
          ref={categoriesRef}
        >
          <h1>
            Grades for <span>{selectedSchool} school</span>
          </h1>
          {grades.map((grade) => (
            <Category
              key={grade}
              label={grade}
              value={grade}
              onClick={() => {
                setCameraPut({ ...cameraPut, grade });
                handleCategoryClick("grade", grade);
              }}
              isActive={grade === selectedGrade}
            />
          ))}
        </div>
      )}
      {selectedGrade && (
        <div
          className={classes["categoriesContainer"]}
          id="classes"
          ref={categoriesRef}
        >
          <h1>
            Classes for <span>{selectedSchool} school</span> -{" "}
            <span>{selectedGrade}</span>
          </h1>
          {classesArray.map((className) => (
            <Category
              key={className}
              label={className}
              value={className}
              onClick={() => {
                setCameraPut({ ...cameraPut, class: className });
                handleCategoryClick("class", className);
              }}
              isActive={className === selectedClass}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cameras;
