import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Departments.module.css";
import {testUrl} from "../home/BaseData";


const Department = () => {
    const {t, i18n} = useTranslation();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        axios
            .get(
                testUrl + "/api/centers"
            )
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) =>
                console.error("Error fetching departments data: ", error)
            );

    }, [i18n.language]);


    const getDepartmentName = (department) => {
        const title = department[`name_${i18n.language}`];
        return title || department.name_uz || t("no_name_available");
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>

                {/* Departments Section */}
                <div className={styles.section}>
                    <h3 className={styles.title}>
                        {t("center")}
                    </h3>
                    <div className={styles.facultyList}>
                        {departments.length > 0 ? (
                            departments.map((department, index) => (
                                <Link key={department.id}
                                      to={`/centers/${department.short_id}`}
                                      className={styles.facultyCard}>
                                    <div className={styles.facultyInfo}>
                                        <h3>{index + 1}. {getDepartmentName(department)}</h3>
                                        <FaArrowRight className={styles.icon}/>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>
                                {t("no_departments_found")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department;
