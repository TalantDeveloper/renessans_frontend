import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaUniversity, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Directions.module.css";
import {testUrl} from "../BaseData";

const Direction = () => {
    const {t, i18n} = useTranslation();
    const [directions, setDirection] = useState([]);

    useEffect(() => {
        axios
            .get(
                testUrl + "/api/directions/"
            )
            .then((response) => {
                setDirection(response.data);
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

    const getDirectionName = (direction) => {
        const name = direction[`name_${i18n.language}`];
        return name || direction.name_uz || t("no_name_available");
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.title}>
                        {t("directions")}
                    </h3>
                    <div className={styles.facultyList}>
                        {directions.length > 0 ? (
                            directions.map((direction) => (
                                <Link
                                    key={direction.id}
                                    to={`/directions/${direction?.short_name}`}
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={direction?.image || "/default-image.jpg"}
                                        alt={getDirectionName(direction) || t("no_name_available")}
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>{getDirectionName(direction)}</h3>
                                        <FaUniversity className={styles.icon}/>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>{t("see_more")}</span>
                                        <FaArrowRight/>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_direction_found")}</div>
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

export default Direction;
