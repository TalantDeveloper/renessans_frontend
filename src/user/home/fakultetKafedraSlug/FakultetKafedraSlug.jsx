import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {FaPhoneAlt, FaEnvelope} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import Slider from "react-slick"; // Importing react-slick for swiper functionality
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme styles
import styles from "./FakultetKafedraSlug.module.css";
import {BaseURL} from "../BaseData";

const FakultetKafedraSlug = () => {
    const {slug} = useParams();
    const {i18n} = useTranslation(); // Access i18n instance
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

    if (loading) return <div className={styles.loading}>
        {i18n.t("loading")}
        </div>;
    if (error) return <div className={styles.error}>{i18n.t("error")}</div>;

    if (!data) return <div className={styles.error}>{i18n.t("noData")}</div>;

    // Get the first staff member
    const firstStaff = data.staffs && data.staffs[0];

    // Get the rest of the staff members
    const restOfTheStaff = data.staffs && data.staffs.slice(1);

    return (
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
                                                <FaPhoneAlt className={styles.iconimiz}/>
                                                <span>{firstStaff.phone}</span>
                                            </div>
                                            <div className={styles.contactItem}>
                                                <FaEnvelope className={styles.icon2}/>
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

                {/* Toolbar / Accordion Section */}
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

                <div className={styles.section}>
                    <div
                        className={`${styles.accordionHeader} ${
                            openAccordion === "baseone" ? styles.active : ""
                        }`}
                        onClick={() => handleAccordionToggle("baseone")}
                    >
            <span className={styles.accordionTitle}>
              {i18n.t("accordionHeaderInternationalCollaboration")}
            </span>
                        <span className={styles.accordionIcon}>
              {openAccordion === "baseone"
                  ? i18n.t("accordionToggleClose")
                  : i18n.t("accordionToggleOpen")}
            </span>
                    </div>
                    {openAccordion === "baseone" && (
                        <div className={styles.accordionContent}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: renderContent("baseone"),
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Staff Slider (Swiper for the rest of the staff members) */}
                {restOfTheStaff && restOfTheStaff.length > 0 && (
                    <div className={styles.staffSwiper}>
                        <h1 className={styles.ourTitle}>Bizning mutaxasislar</h1>
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={100}
                            slidesToShow={2}
                            slidesToScroll={1}
                            centerMode={true}
                            autoplay={true} // Enable auto-slide
                            autoplaySpeed={3000}
                            focusOnSelect={true} // Focus on the selected slide
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2, // Show 2 slides on medium screens
                                    },
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1, // Show 1 slide on small screens
                                    },
                                },
                            ]}
                        >
                            {restOfTheStaff.map((staff) => (
                                <div key={staff.id} className={styles.staffCard}>
                                    <div className={styles.staffInfo}>
                                        {staff.image && (
                                            <img
                                                src={staff.image}
                                                alt={staff[`full_name_${i18n.language}`]}
                                                className={styles.staffImage2}
                                            />
                                        )}
                                        <div className={styles.staffText}>
                                            <p className={styles.staffName}>
                                                {staff[`full_name_${i18n.language}`]}
                                            </p>
                                            <p className={styles.staffOccupation}>
                                                {staff[`occupation_${i18n.language}`]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>

            
        </div>
    );
};

export default FakultetKafedraSlug;
