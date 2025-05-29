import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Scholarship.module.css";
import { useNavigate } from "react-router-dom";
import {
  FaAward,
  FaUserGraduate,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BaseURL } from "../home/BaseData";
const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const { i18n } = useTranslation(); // Access current language from i18n

  // Fetch data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          BaseURL + "api/students/scholarship-holders/"
        );
        const formattedData = response.data.map((student) => ({
          name: `${student[`name_${i18n.language}`]} ${
            student[`surname_${i18n.language}`]
          }`, // Select name and surname based on the current language
          description: student[`description_${i18n.language}`], // Select description based on the current language
          image: student.image,
          scholarship: "Noma'lum", // Placeholder as scholarship type isn't in the data
          year: new Date().getFullYear(),
        }));
        setStudents(formattedData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [i18n.language]); // Fetch data again when the language changes

  const toggleCard = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.allContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>{i18n.t("ourScholarshipHolders")}</h1>
        <div className={styles.cardContainer}>
          {students.map((student, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                flippedCards[index] ? styles.flipped : ""
              }`}
              onClick={() => toggleCard(index)}
            >
              <div className={styles.cardFront}>
                <img
                  src={student.image}
                  alt={student.name}
                  className={styles.studentImage}
                />
                <div className={styles.content}>
                  <h3 className={styles.studentName}>
                    <FaUserGraduate className={styles.icon} /> {student.name}
                  </h3>
                  <p className={styles.scholarship}>
                    <FaAward className={styles.iconSmall} />{" "}
                    {student.description}
                  </p>
                </div>
              </div>

              <div className={styles.cardBack}>
                <p className={styles.description}>
                  {i18n.t("thisStudent")} <br />"{student.description}"{" "}
                  {i18n.t("awardWinner")}
                </p>
                <p className={styles.year}>
                  <FaCalendarAlt className={styles.iconSmall} />{" "}
                  {i18n.t("year")}: {student.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sidebar}>
        <h3>{i18n.t("university")}</h3>
        <ul>
          <li onClick={() => navigate("/about-uni")}>
            {i18n.t("studentsLife")}
          </li>
          <li onClick={() => navigate("/our-campions")}>
            {i18n.t("ourChampions")}
          </li>
          <li onClick={() => navigate("/good-st")}>
            {i18n.t("universityExcellence")}
          </li>
          <li onClick={() => navigate("/university-union")}>
            {i18n.t("universityUnion")}
          </li>
          <li
            className={styles.active}
            onClick={() => navigate("/scholarship")}
          >
            <FaArrowRight className={styles.sidebarIcon} />
            {i18n.t("ourScholarship")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentsPage;
