import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaUniversity, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Partners.module.css";
import {BaseURL, testUrl} from "../BaseData";

const Partners = () => {
    const {t, i18n} = useTranslation();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(testUrl + "api/partners/")
            .then((response) => {
                setPartners(response.data);
            })
            .catch((error) => {
                setError("Error fetching partners data");
                console.error("Error fetching partners data: ", error);
            })
            .finally(() => setLoading(false));

        // axios
        //     .get(
        //         BaseURL + "api/kafedra/kafedra-cards/"
        //     )
        //     .then((response) => {
        //         setDepartments(response.data);
        //     })
        //     .catch((error) =>
        //         console.error("Error fetching departments data: ", error)
        //     );
    }, [i18n.language]);

    const getFacultyName = (faculty) => {
        const name = faculty[`name_${i18n.language}`];
        return name || faculty.name_uz || t("no_name_available");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                
                <div className={styles.section}>
                    <h3 className={styles.title}>{t("partners")}</h3>
                    <div className={styles.facultyList}>
                        {partners.length > 0 ? (
                            partners.map((partner) => (
                                <div key={partner.id} className={styles.facultyCard}>
                                    <img
                                        src={partner.image || "/default-image.jpg"}
                                        alt={partner.name}
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>{partner.name}</h3>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <a href={partner.link_url} target="_blank" rel="noopener noreferrer">
                                            Batafsil
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>{t("no_partners_found")}</div>
                        )}
                    </div>
                </div>

                {/* Departments Section */}
                {/* <div className={styles.section}>
                    <h3 className={styles.title}>{t("departments")}</h3>
                    <div className={styles.facultyList}>
                        {departments.length > 0 ? (
                            departments.map((department) => (
                                <Link
                                    key={department.id}
                                    to={`/faculty-kafedra/${department.slug}`}
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={department.faculty?.image || "/default-image.jpg"}
                                        alt={
                                            getDepartmentName(department) || t("no_name_available")
                                        }
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>{getDepartmentName(department)}</h3>
                                        <FaUniversity className={styles.icon}/>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>{t("see_more")}</span>
                                        <FaArrowRight/>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_departments_found")}</div>
                        )}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Partners;
