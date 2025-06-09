import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaUniversity, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./FakultetKafedra.module.css";
import {BaseURL} from "../BaseData";

const FakultetKafedra = () => {
    const {t, i18n} = useTranslation();
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios
            .get(
                BaseURL + "api/fakultet/fakultet-cards/"
            )
            .then((response) => {
                setFaculties(response.data);
            })
            .catch((error) =>
                console.error("Error fetching faculties data: ", error)
            );

        axios
            .get(
                BaseURL + "api/kafedra/kafedra-cards/"
            )
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) =>
                console.error("Error fetching departments data: ", error)
            );
    }, [i18n.language]);

    const getFacultyName = (faculty) => {
        const name = faculty[`title_${i18n.language}`];
        return name || faculty.title_uz || t("no_name_available");
    };

    const getDepartmentName = (department) => {
        const title = department[`title_${i18n.language}`];
        return title || department.title_uz || t("no_name_available");
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.title}>{t("faculties")}</h3>
                    <div className={styles.facultyList}>
                        {faculties.length > 0 ? (
                            faculties.map((faculty) => (
                                <Link
                                    key={faculty.id}
                                    to={`/faculty-kafedra/${faculty.slug}`}
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={faculty.faculty?.image || "/default-image.jpg"}
                                        alt={getFacultyName(faculty) || t("no_name_available")}
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>{getFacultyName(faculty)}</h3>
                                        <FaUniversity className={styles.icon}/>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>{t("see_more")}</span>
                                        <FaArrowRight/>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_faculties_found")}</div>
                        )}
                    </div>
                </div>

                {/* Departments Section */}
                <div className={styles.section}>
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
                </div>
            </div>
        </div>
    );
};

export default FakultetKafedra;
