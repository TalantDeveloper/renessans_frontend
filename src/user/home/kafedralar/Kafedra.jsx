import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaUniversity, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Kafedra.module.css";
import {BaseURL, testUrl} from "../BaseData";

const Kafedra = () => {
    const {t, i18n} = useTranslation();
    const [kafedralar, setKafedra] = useState([]);
    console.log(kafedralar);

    useEffect(() => {
        axios
            .get(
                testUrl + "/api/departments/"
            )
            .then((response) => {
                setKafedra(response.data);
            })
            .catch((error) =>
                console.error("Error fetching kafedra data: ", error)
            );

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

    const getKafedraName = (kafedra) => {
        const name = kafedra[`name_${i18n.language}`];
        return name || kafedra.name_uz || t("no_name_available");
    };

    

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.title}>
                        {t("kafedra")}
                    </h3>
                    <div className={styles.facultyList}>
                        {kafedralar.length > 0 ? (
                            kafedralar.map((kafedra) => (
                                <Link
                                    key={kafedra.id}
                                    to={`/departments/${kafedra?.short_name}`}
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={kafedra?.image || "/default-image.jpg"}
                                        alt={getKafedraName(kafedra) || t("no_name_available")}
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>{getKafedraName(kafedra)}</h3>
                                        <FaUniversity className={styles.icon}/>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>{t("see_more")}</span>
                                        <FaArrowRight/>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_kafedra_found")}</div>
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

export default Kafedra;
