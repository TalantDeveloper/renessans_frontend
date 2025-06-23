import React from "react";
import {FaCertificate} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Schools.module.css";

const CertificateVerification = () => {
    const {t} = useTranslation();

    return (
        <div data-aos="fade-up" className={styles.container}>
            <h2 className={styles.title}>{t("schooltitle")}</h2>
            <p className={styles.subtitle}>{t("schoolsubtitle")}</p>
            <div className={styles.iconContainer}>
                <FaCertificate className={styles.icon}/>
            </div>
            <div className={styles.buttonGroup}>
                <a
                    target="blank"
                    href="https://document.licenses.uz/certificate/uuid/4ce5addd-44f3-4079-95ea-9e7c9676a427/pdf?language=oz&download">
                    <button className={styles.button}>
                        {t("viewLicense")}
                    </button>
                </a>
                <a
                    target="blank"
                    href="https://license.gov.uz/registry?filter%5Btin%5D=310007260&filter%5Bdocument_type%5D=LICENSE">
                    <button className={styles.button}>{t("verifyLicense")}</button>
                </a>
            </div>
        </div>
    );
};

export default CertificateVerification;
