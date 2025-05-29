import React, { useEffect, useState } from "react";
import styles from "./Champions.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaTrophy, FaMedal, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ChampionsBoard = () => {
  const [champions, setChampions] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Hook to manage language

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://sayt.renessans-edu.uz/api/students/champion-students/")
      .then((response) => setChampions(response.data))
      .catch((error) => console.error("Error fetching champions data:", error));
  }, []);

  // Determine the trophy icon and stars based on description
  const renderTrophyIconAndStars = (description) => {
    if (!description)
      return { icon: <FaTrophy className={styles.icon} />, stars: 2 }; // Return default if description is undefined

    const lowerCaseDescription = description.toLowerCase();
    if (lowerCaseDescription.includes("oltin")) {
      return {
        icon: <FaMedal className={styles.icon} style={{ color: "#FFD700" }} />,
        stars: 5,
      };
    } else if (lowerCaseDescription.includes("kumush")) {
      return {
        icon: <FaMedal className={styles.icon} style={{ color: "#C0C0C0" }} />,
        stars: 4,
      };
    } else if (lowerCaseDescription.includes("bronza")) {
      return {
        icon: <FaMedal className={styles.icon} style={{ color: "#CD7F32" }} />,
        stars: 3,
      };
    } else {
      return {
        icon: <FaTrophy className={styles.icon} />,
        stars: 2,
      };
    }
  };

  // Render stars dynamically
  const renderStars = (count) =>
    Array.from({ length: count }).map((_, idx) => (
      <FaStar key={idx} className={styles.star} />
    ));

  return (
    <section className={styles.championBoard}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("championBoardTitle")}</h2>{" "}
        {/* Use translation */}
        <div className={styles.championGrid}>
          {champions.map((champion) => {
            const { icon, stars } = renderTrophyIconAndStars(
              champion[`description_${i18n.language}`] // Dynamically use the selected language description
            );
            return (
              <div key={champion.id} className={styles.championCard}>
                <div className={styles.cardHeader}>
                  <img
                    src={champion.image}
                    alt={`${champion[`name_${i18n.language}`]} ${
                      champion[`surname_${i18n.language}`]
                    }`} // Dynamically display name and surname
                    className={styles.championImage}
                  />
                  <div className={styles.cardIcons}>{icon}</div>
                </div>
                <h3 className={styles.championName}>
                  {champion[`name_${i18n.language}`]}{" "}
                  {champion[`surname_${i18n.language}`]}{" "}
                  {/* Dynamically display name and surname */}
                </h3>
                <p className={styles.championPosition}>
                  {champion[`description_${i18n.language}`]}{" "}
                  {/* Dynamically display description */}
                </p>
                <div className={styles.stars}>{renderStars(stars)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.sidebar}>
        <h3>{t("university")}</h3>
        <ul>
          <li onClick={() => navigate("/about-uni")}>{t("studentsLife")}</li>
          <li
            onClick={() => navigate("/our-campions")}
            className={styles.active}
          >
            <FaArrowRight className={styles.sidebarIcon} />
            {t("ourChampions")}
          </li>
          <li onClick={() => navigate("/good-st")}>
            {t("universityExcellence")}
          </li>
          <li onClick={() => navigate("/university-union")}>
            {t("universityUnion")}
          </li>
          <li onClick={() => navigate("/scholarship")}>
            {t("ourScholarship")}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ChampionsBoard;
