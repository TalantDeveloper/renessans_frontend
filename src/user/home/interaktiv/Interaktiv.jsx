import React from "react";
import styles from "./InteractiveServices.module.css";
import {
    FaFileAlt,
    FaUserGraduate,
    FaRedo,
    FaClipboardCheck,
} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const InteractiveServices = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("interactive_services_title")}</h2>
            <div className={styles.servicesGrid}>
                <a href="https://renessans-edu.uz/uz/cv" target="blank">
                    <div className={`${styles.serviceCard} ${styles.gradient1}`}>
                        <div className={styles.icon}>
                            <FaFileAlt/>
                        </div>
                        <div className={styles.textContent}>
                            <h3>{t("bachelor_title")}</h3>
                            <p>{t("bachelor_description")}</p>
                        </div>
                        <FaFileAlt className={styles.backgroundIcon}/>
                    </div>
                </a>
                <a href="https://renessans-edu.uz/uz/cv" target="blank">
                    <div className={`${styles.serviceCard} ${styles.gradient3}`}>
                        <div className={styles.icon}>
                            <FaRedo/>
                        </div>
                        <div className={styles.textContent}>
                            <h3>{t("transfer_title")}</h3>
                            <p>{t("transfer_description")}</p>
                        </div>
                        <FaRedo className={styles.backgroundIcon}/>
                    </div>
                </a>
                <a href="https://renessans-edu.uz/uz/cv" target="blank">
                    <div className={`${styles.serviceCard} ${styles.gradient4}`}>
                        <div className={styles.icon}>
                            <FaClipboardCheck/>
                        </div>
                        <div className={styles.textContent}>
                            <h3>{t("second_specialty_title")}</h3>
                            <p>{t("second_specialty_description")}</p>
                        </div>
                        <FaClipboardCheck className={styles.backgroundIcon}/>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default InteractiveServices;
