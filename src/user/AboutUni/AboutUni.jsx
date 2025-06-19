import React, { useEffect, useState } from "react";
import {
    // FaUniversity,
    // FaRegCalendarAlt,
    // FaFlask,
    // FaBasketballBall,
    // FaHandsHelping,
    FaArrowRight,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import styles from "./AboutUni.module.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { testUrl } from "../home/BaseData";

const TalabaHayoti = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentLang = i18n.language;

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(testUrl + "/api/student-life/")
            .then((response) => {
                setSections(response.data || []);
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [currentLang]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.allContainer}>
            <div className={styles.container}>
                {sections.map((section, idx) => (
                    <div key={section.id} className={styles.section}>
                        <div className={styles.imageWrapper}>
                            <img src={section.main_image} alt={section[`title_${currentLang}`]} className={styles.image} />
                        </div>
                        <div className={styles.contentWrapper}>
                            <h2 className={styles.title}>{section[`title_${currentLang}`]}</h2>
                            <div className={styles.description} dangerouslySetInnerHTML={{ __html: section[`full_text_${currentLang}`] }} />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src={section.second_image} alt={section[`title_${currentLang}`]} className={styles.image} />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.sidebar}>
                <h3>
                    Universitet
                </h3>
                <ul>
                    <li className={styles.active} onClick={() => navigate("/about-uni")}>
                        <FaArrowRight className={styles.sidebarIcon}/>
                        {t("Talabalar hayoti")}
                    </li>
                    <li onClick={() => navigate("/our-campions")}>
                        {t("Bizning chempionlar")}
                    </li>
                    <li onClick={() => navigate("/good-st")}>
                        {t("universitet a'lochilari")}
                    </li>
                    <li onClick={() => navigate("/university-union")}>
                        {t("universityUnion")}
                    </li>
                    <li onClick={() => navigate("/scholarship")}>
                        {t("bizning stipendiantlar")}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TalabaHayoti;
