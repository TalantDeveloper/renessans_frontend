import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./FakultetKafedraSlug.module.css";
import { BaseURL } from "../BaseData";

const FakultetKafedraSlug = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAccordion, setOpenAccordion] = useState("activity");

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchFacultyData = axios.get(
            BaseURL + "api/fakultet/fakultet-cards/"
        );
        const fetchDepartmentData = axios.get(
            BaseURL + "api/kafedra/kafedra-cards/"
        );

        Promise.all([fetchFacultyData, fetchDepartmentData])
            .then(([facultyResponse, departmentResponse]) => {
                const faculty = facultyResponse.data.find((item) => item.slug === slug);
                const department = departmentResponse.data.find(
                    (item) => item.slug === slug
                );

                if (faculty) {
                    setData(faculty);
                } else if (department) {
                    setData(department);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [slug, i18n.language]);

    const handleAccordionToggle = (accordionId) => {
        setOpenAccordion(openAccordion === accordionId ? null : accordionId);
    };

    const renderContent = (key) => {
        return data[key + `_${i18n.language}`];
    };

    if (loading) return <div className={styles.loading}>{i18n.t("loading")}</div>;
    if (error) return <div className={styles.error}>{i18n.t("error")}</div>;
    if (!data) return <div className={styles.error}>{i18n.t("noData")}</div>;

    const firstStaff = data.staffs && data.staffs[0];
    const restOfTheStaff = data.staffs && data.staffs.slice(1);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {data[`title_${i18n.language}`] || i18n.t("noTitleAvailable")}
                    </h1>
                </div>

                <div className={styles.details}>
                    {data.statistics && (
                        <div className={styles.section}>
                            {firstStaff && (
                                <div className={styles.staff}>
                                    <div className={styles.staffInfo}>
                                        {firstStaff.image && (
                                            <img
                                                src={firstStaff.image}
                                                alt={firstStaff[`name_uz${i18n.language}`]}
                                                className={styles.staffImage}
                                            />
                                        )}
                                        <div className={styles.staffText}>
                                            <p className={styles.staffName}>
                                                {firstStaff[`full_name_${i18n.language}`]}
                                            </p>
                                            <p className={styles.staffOccupation}>
                                                {firstStaff[`occupation_${i18n.language}`]}
                                            </p>
                                            <div className={styles.contact}>
                                                <div className={styles.contactItem}>
                                                    <FaPhoneAlt className={styles.iconimiz} />
                                                    <span>{firstStaff.phone}</span>
                                                </div>
                                                <div className={styles.contactItem}>
                                                    <FaEnvelope className={styles.icon2} />
                                                    <span>{firstStaff.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h3 className={styles.statisticsTitle}>
                                {i18n.t("statisticsHeader")}
                            </h3>

                            <div className={styles.statisticsContent}>
                                {data.statistics.map((stat) => (
                                    <div key={stat.id} className={styles.statisticCard}>
                                        <div className={styles.statisticCardNumber}>
                                            {Math.floor(stat.number)}
                                        </div>
                                        <div className={styles.statisticCardTitle}>
                                            {stat[`name_${i18n.language}`]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.section}>
                        <div
                            className={`${styles.accordionHeader} ${
                                openAccordion === "tasks" ? styles.active : ""
                            }`}
                            onClick={() => handleAccordionToggle("tasks")}
                        >
                            <span className={styles.accordionTitle}>
                                {i18n.t("accordionHeaderTasks")}
                            </span>
                            <span className={styles.accordionIcon}>
                                {openAccordion === "tasks"
                                    ? i18n.t("accordionToggleClose")
                                    : i18n.t("accordionToggleOpen")}
                            </span>
                        </div>
                        {openAccordion === "tasks" && (
                            <div className={styles.accordionContent}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: renderContent("tasks"),
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.section}>
                        <div
                            className={`${styles.accordionHeader} ${
                                openAccordion === "scientificactivity" ? styles.active : ""
                            }`}
                            onClick={() => handleAccordionToggle("scientificactivity")}
                        >
                            <span className={styles.accordionTitle}>
                                {i18n.t("accordionHeaderScientificActivity")}
                            </span>
                            <span className={styles.accordionIcon}>
                                {openAccordion === "scientificactivity"
                                    ? i18n.t("accordionToggleClose")
                                    : i18n.t("accordionToggleOpen")}
                            </span>
                        </div>
                        {openAccordion === "scientificactivity" && (
                            <div className={styles.accordionContent}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: renderContent("scientificactivity"),
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.section}>
                        <div
                            className={`${styles.accordionHeader} ${
                                openAccordion === "basetwo" ? styles.active : ""
                            }`}
                            onClick={() => handleAccordionToggle("basetwo")}
                        >
                            <span className={styles.accordionTitle}>
                                {i18n.t("accordionHeaderLabs")}
                            </span>
                            <span className={styles.accordionIcon}>
                                {openAccordion === "basetwo"
                                    ? i18n.t("accordionToggleClose")
                                    : i18n.t("accordionToggleOpen")}
                            </span>
                        </div>
                        {openAccordion === "basetwo" && (
                            <div className={styles.accordionContent}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: renderContent("basetwo"),
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {restOfTheStaff && restOfTheStaff.length > 0 && (
                        <div className={styles.section}>
                            <h3 className={styles.staffSliderTitle}>
                                {i18n.t("staffSliderTitle")}
                            </h3>
                            <Slider
                                {...{
                                    dots: true,
                                    infinite: true,
                                    speed: 500,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    responsive: [
                                        {
                                            breakpoint: 1024,
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 1,
                                                infinite: true,
                                                dots: true,
                                            },
                                        },
                                        {
                                            breakpoint: 600,
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                            },
                                        },
                                    ],
                                }}
                            >
                                {restOfTheStaff.map((staff) => (
                                    <div key={staff.id} className={styles.staffCard}>
                                        {staff.image && (
                                            <img
                                                src={staff.image}
                                                alt={staff[`full_name_${i18n.language}`]}
                                                className={styles.staffCardImage}
                                            />
                                        )}
                                        <div className={styles.staffCardBody}>
                                            <p className={styles.staffCardName}>
                                                {staff[`full_name_${i18n.language}`]}
                                            </p>
                                            <p className={styles.staffCardOccupation}>
                                                {staff[`occupation_${i18n.language}`]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.sidebar}>
                <h3>{i18n.t("university")}</h3>
                <ul>
                    <li onClick={() => navigate("/about")} className={styles.active}>
                        <span className={styles.icon}>▶</span>
                        {i18n.t("about_university")}
                    </li>
                    <li onClick={() => navigate("/management")}>{i18n.t("management")}</li>
                    <li onClick={() => navigate("/structure")}>{i18n.t("structure")}</li>
                    <li onClick={() => navigate("/international-cooperation")}>
                        {i18n.t("international_cooperation")}
                    </li>
                    <li
                        className={styles}
                        onClick={() => navigate("/faculty-kafedra")}
                    >
                        {i18n.t("faculties")}
                    </li>
                    <li onClick={() => navigate("/anons")}>{i18n.t("events")}</li>
                    <li
                        onClick={() => navigate("/statistics")}
                        className={styles.dropdownToggle}
                    >
                        {i18n.t("statistics")}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FakultetKafedraSlug;

