import React from "react";
import styles from "./SmCourses.module.css";
import {useNavigate} from "react-router-dom";
import {
    FaChalkboardTeacher,
    FaBaby,
    FaLanguage,
    FaUniversity,
    FaRobot,
    FaBriefcase,
    FaMoneyBillWave,
    FaLaptopCode,
    FaFootballBall,
} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Department = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const departments = [
        /* {
            name: t("financeAndFinancialTechnologies"), // "Iqtisodiyot"
            icon: <FaUniversity color="rgb(18 77 141)"/>,
            count: 2216,
        },
        {
            name: t("computerEngineering"), // "Axborot tizimlari va texnologiyalari"
            icon: <FaLaptopCode color="rgb(18 77 141)"/>,
            count: 671,
        },
        {
            name: t("financialLiteracy"), // "Bank ishi va audit"
            icon: <FaMoneyBillWave color="rgb(18 77 141)"/>,
            count: 631,
        },
        {
            name: t("sportsActivities"), // "Sport faoliyati"
            icon: <FaFootballBall color="rgb(18 77 141)"/>,
            count: 972,
        },
        {
            name: t("earlyEducation"), // "Boshlang'ich ta'lim"
            icon: <FaChalkboardTeacher color="rgb(18 77 141)"/>,
            count: 957,
        },
        {
            name: t("psychology"), // "Psixologiya"
            icon: <FaBaby color="rgb(18 77 141)"/>,
            count: 853,
        },
        {
            name: t("history"), // "Tarix"
            icon: <FaUniversity color="rgb(18 77 141)"/>,
            count: 617,
        },
        {
            name: t("philologyAndLanguageTeaching"), // "Filologiya (rus tili)"
            icon: <FaLanguage color="rgb(18 77 141)"/>,
            count: 690,
        }, */
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>{t("topDepartments")}</h1>
                    <p>{t("popularCoursesMessage")}</p>
                </div>
                <a onClick={() => navigate("/all-courses")} className={styles.viewAll}>
                    {t("viewAllCourses")} <span className={styles.arrow}>→</span>
                </a>
            </div>
            <div className={styles.cards}>
                {departments.map((dept, index) => (
                    <div
                        onClick={() => navigate("/all-courses")}
                        key={index}
                        className={styles.card}>
                        <div className={styles.icon}>{dept.icon}</div>
                        <h2>{dept.name}</h2>
                        <p>
                            {t("courseCountMessage")} {dept.count}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Department;
