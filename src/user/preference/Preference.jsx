import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./Preference.module.css";
import {useNavigate} from "react-router-dom";
import {FaStar, FaTrophy, FaCrown, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const ChampionsBoard = () => {
    const [champions, setChampions] = useState([]);
    const navigate = useNavigate();
    const {i18n} = useTranslation(); // Use i18n to get the current language

    // Fetch data from API
    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const response = await axios.get(
                    "https://sayt.renessans-edu.uz/api/students/excellent-students/"
                );
                const formattedData = response.data.map((champion) => ({
                    id: champion.id,
                    name: champion[`name_${i18n.language}`], // Dynamically choose the name based on language
                    surname: champion[`surname_${i18n.language}`], // Dynamically choose the surname based on language
                    description: champion[`description_${i18n.language}`], // Dynamically choose the description based on language
                    photo: champion.image,
                    rating: 5, // Placeholder for rating
                }));
                setChampions(formattedData);
            } catch (error) {
                console.error("Error fetching champions:", error);
            }
        };
        fetchChampions();
    }, [i18n.language]); // Fetch data again when the language changes

    return (
        <div className={styles.allContainer}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>{i18n.t("ExellentBoardTitle")}</h1>
                    <p className={styles.description}>{i18n.t("description")}</p>
                </header>

                <div className={styles.infoTiles}>
                    <div className={styles.notification}>
                        <div className={styles.notiglow}></div>
                        <div className={styles.notiborderglow}></div>
                        <div className={styles.notititle}>
                            {i18n.t("highestScores")} <FaCrown/>
                        </div>
                        <div className={styles.notibody}>
                            {i18n.t("awardedToOurExcellence")}
                        </div>
                    </div>
                    <div className={styles.notification}>
                        <div className={styles.notiglow}></div>
                        <div className={styles.notiborderglow}></div>
                        <div className={styles.notititle}>
                            {i18n.t("awards")} <FaTrophy/>
                        </div>
                        <div className={styles.notibody}>{i18n.t("awardedToStudents")}</div>
                    </div>
                </div>

                <div className={styles.board}>
                    {champions.map((champion) => (
                        <div key={champion.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <img
                                    src={champion.photo}
                                    alt={`${champion.name} ${champion.surname}`}
                                />
                            </div>
                            <div className={styles.cardBody}>
                                <h3>
                                    {champion.name} {champion.surname}{" "}
                                    <FaTrophy className={styles.trophyIcon}/>
                                </h3>
                                <p>{champion.description}</p>
                                <div className={styles.stars}>
                                    {[...Array(champion.rating)].map((_, i) => (
                                        <FaStar key={i} className={styles.star}/>
                                    ))}
                                </div>
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
                    <li className={styles.active} onClick={() => navigate("/good-st")}>
                        <FaArrowRight className={styles.sidebarIcon}/>
                        {i18n.t("universityExcellence")}
                    </li>
                    <li onClick={() => navigate("/university-union")}>
                        {i18n.t("universityUnion")}
                    </li>
                    <li onClick={() => navigate("/scholarship")}>
                        {i18n.t("ourScholarship")}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ChampionsBoard;
