import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottieView from "lottie-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp, FaCalendarDay,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./FakultetKafedraSlug.module.css";
// import classerror from "../../shared/pages/Error404Page.module.css";
// import Error404Animation from "../../shared/assets/animated-placeholders/Error404.json";
import { BaseURL, testUrl } from "../BaseData";

const FakultetKafedraSlug = () => {
    const navigate = useNavigate();
    const { short_name } = useParams();
    const {t, i18n } = useTranslation();
    const [fakultet, setFakultet] = useState(null);
    const [boss, setBoss] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [fakultetlar, setFakultetlar] = useState([]);
    console.log(fakultet);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState({});

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchFacultyData = axios.get(
            testUrl + "/api/fakultet/" + short_name
        );
        
        Promise.all([fetchFacultyData])
            .then(([facultyResponse]) => {
                const faculty = facultyResponse.data;
                if (faculty) {
                    setFakultet(faculty.fakultet);
                    setFakultetlar(faculty.fakultetlar || []);
                    setBoss(faculty.boss?.[0] || null);
                    setEmployees(faculty.employees || []);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [short_name, i18n.language]);

    const toggleDropdown = (id, type) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [id]: {
                activities: type === "activities" ? !prev[id]?.activities : false,
                responsibilities:
                    type === "responsibilities" ? !prev[id]?.responsibilities : false,
            },
        }));
    };

    const getDepartmentName = (fakultet) => {
        const title = fakultet[`name_${i18n.language}`];
        return title || fakultet.name_uz || t("no_name_available");
    };

    if (loading) return <p>Yuklanmoqda...</p>;
    // if (error) return (
    //     <div className={classerror["error-page"]}>
    //         <LottieView className={classerror["animation"]}
    //         animationData={Error404Animation}
    //         loop={true}
    //         />
    //         <p className={classerror["title"]}>
    //             {t("sorry")}
    //         </p>
    //         <p className={classerror["description"]}>
    //             {t("back_main")}
    //         </p>
    //         <div onClick={() => navigate("/")} className={classerror["button"]}>
    //             {t("main_menu")}
    //         </div>
    //     </div>
    // )  


    return (
        
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>
            
                <h1 className={classes["page-title"]}>
                    {fakultet[`name_${i18n.language}`]}
                </h1>
                {/* <img src={fakultet?.image} alt="" /> */}
                <div dangerouslySetInnerHTML={{
                    __html: fakultet[`content_${i18n.language}`],
                }}/>
                <h1 className={classes["page-title"]}>
                    XODIMLAR
                </h1>
                {boss && <div className={`${classes.card}`} key={boss.employee?.id}>
                    <div className={classes.headerLeft}>
                        <div className={classes.info}>
                            <h2>
                                {boss.employee[`name_${i18n.language}`]}
                            </h2>
                            <p>
                                {t("position")}
                                    {boss[`position_${i18n.language}`]}
                            </p>
                            <div className={classes.contact}>
                                <div className={classes.contactItem}>
                                    <FaPhoneAlt className={classes.icon}/>
                                    <span>{boss.employee?.phone}</span>
                                </div>
                                <div className={classes.contactItem}>
                                    <FaEnvelope className={classes.icon2}/>
                                    <span>{boss.employee?.email}</span>
                                </div>
                                <div className={classes.contactItem}>
                                    <FaCalendarDay className={classes.icon}/>
                                    <span>
                                    {t("ish_staj")} 
                                    {boss.employee[`work_experience_${i18n.language}`]}
                                    </span>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                <button
                                    className={classes.button}
                                    onClick={() => toggleDropdown(boss.employee?.id, "activities")}>
                                    {t("about_employee")}
                                    {openDropdown[boss.employee?.id]?.activities ? (
                                        <FaChevronUp/>
                                    ) : (
                                        <FaChevronDown/>
                                    )}
                                </button>
                                <button
                                    className={classes.button}
                                    onClick={() =>
                                        toggleDropdown(boss.employee?.id, "responsibilities")
                                    }>
                                    {t("specialization")}
                                    {openDropdown[boss.employee?.id]?.responsibilities ? (
                                        <FaChevronUp/>
                                    ) : (
                                        <FaChevronDown/>
                                    )}
                                </button>
                            </div>
                            <div
                                className={`${classes.dropdownContent} ${
                                    openDropdown[boss.employee?.id]?.activities ? classes.show : ""
                                }`}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: boss.employee[`about_${i18n.language}`],
                                    }}
                                />
                            </div>
                            <div className={`${classes.dropdownContent} ${
                                openDropdown[boss.employee?.id]?.responsibilities
                                    ? classes.show
                                    : ""}`}>
                                <div dangerouslySetInnerHTML={{
                                    __html: boss.employee[`specialization_${i18n.language}`],
                                }}/>
                            </div>
                        </div>
                
                        <div className={classes.imageWrapper}>
                            <img src={testUrl + boss.employee?.image} // Fallback to default image if not available
                                 alt={boss.employee[`name_${i18n.language}`]}
                                 className={classes.logo}/>
                        </div>
                    </div>
                </div>}

                {employees.map((employee, index) => (
                    <div
                        className={`${classes.card} ${
                            index === 0 ? classes.highlightedCard : ""
                        }`}
                        key={employee.id}>
                        <div className={classes.headerLeft}>
                            <div className={classes.info}>
                                <h2>{employee.employee[`name_${i18n.language}`]}</h2>
                                <p>
                                {t("position")} 
                                    {employee[`position_${i18n.language}`]}</p>
                                <div className={classes.contact}>
                                    <div className={classes.contactItem}>
                                        <FaPhoneAlt className={classes.icon}/>
                                        <span>{employee.employee?.phone}</span>
                                    </div>
                                    <div className={classes.contactItem}>
                                        <FaEnvelope className={classes.icon2}/>
                                        <span>{employee.employee?.email}</span>
                                    </div>
                                    {employee.employee[`work_experience_${i18n.language}`] && (
                                        <div className={classes.contactItem}>
                                            <FaCalendarDay className={classes.icon}/>
                                            <span>
                                            {t("ish_staj")} 
                                            {employee.employee[`work_experience_${i18n.language}`]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className={classes.buttons}>
                                    <button className={classes.button}
                                            onClick={() => toggleDropdown(employee.employee.id, "activities")}>
                                        {t("about_employee")}
                                        {openDropdown[employee.employee.id]?.activities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                    <button className={classes.button}
                                            onClick={() =>
                                                toggleDropdown(employee.employee.id, "responsibilities")
                                            }>
                                        {t("specialization")}
                                        {openDropdown[employee.employee.id]?.responsibilities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                </div>
                                <div className={`${classes.dropdownContent} ${
                                    openDropdown[employee.employee.id]?.activities ? classes.show : ""
                                }`}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: employee.employee[`about_${i18n.language}`],
                                    }}/>
                                </div>
                                <div className={`${classes.dropdownContent} ${
                                    openDropdown[employee.employee.id]?.responsibilities
                                        ? classes.show
                                        : ""
                                }`}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: employee.employee[`about_${i18n.language}`],
                                    }}/>
                                </div>
                            </div>

                            <div className={classes.imageWrapper}>
                                <img src={testUrl + employee.employee.image} // Fallback to default image if not available
                                     alt={employee.employee[`name_${i18n.language}`]}
                                     className={classes.logo}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className={classes.sidebar} style={{marginLeft: 0, marginRight: "40px"}}>
                <h3>{t("Kafedra va fakultetlar")}</h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {fakultetlar.length > 0 ? (
                        fakultetlar.map((fakultet, index) => (
                            <li
                                onClick={() => navigate(`/faculty-kafedra/${fakultet.short_name}`)}
                                key={fakultet.id}
                                style={{marginBottom: '10px'}}
                                className={fakultet.short_name === short_name ? classes.active : ''}
                            >
                                <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                <span
                                    style={{cursor: 'pointer', color: '#133654'}}
                                >
                                    {getDepartmentName(fakultet)}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>{t("no_departments_found")}</li>
                    )}
                </ul>
            </div>
        </div>

        // <div className={styles.mainContainer}>
        //     <div className={styles.container}>
        //         <div className={styles.header}>
        //             <h1 className={styles.title}>
        //                 {fakultet[`name_${i18n.language}`] || i18n.t("noTitleAvailable")}
        //             </h1>
        //         </div>

        //         <div className={styles.details}>
        //             {data.statistics && (
        //                 <div className={styles.section}>
        //                     {firstStaff && (
        //                         <div className={styles.staff}>
        //                             <div className={styles.staffInfo}>
        //                                 {firstStaff.image && (
        //                                     <img
        //                                         src={firstStaff.image}
        //                                         alt={firstStaff[`name_uz${i18n.language}`]}
        //                                         className={styles.staffImage}
        //                                     />
        //                                 )}
        //                                 <div className={styles.staffText}>
        //                                     <p className={styles.staffName}>
        //                                         {firstStaff[`full_name_${i18n.language}`]}
        //                                     </p>
        //                                     <p className={styles.staffOccupation}>
        //                                         {firstStaff[`occupation_${i18n.language}`]}
        //                                     </p>
        //                                     <div className={styles.contact}>
        //                                         <div className={styles.contactItem}>
        //                                             <FaPhoneAlt className={styles.iconimiz} />
        //                                             <span>{firstStaff.phone}</span>
        //                                         </div>
        //                                         <div className={styles.contactItem}>
        //                                             <FaEnvelope className={styles.icon2} />
        //                                             <span>{firstStaff.email}</span>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     )}

        //                     <h3 className={styles.statisticsTitle}>
        //                         {i18n.t("statisticsHeader")}
        //                     </h3>

        //                     <div className={styles.statisticsContent}>
        //                         {data.statistics.map((stat) => (
        //                             <div key={stat.id} className={styles.statisticCard}>
        //                                 <div className={styles.statisticCardNumber}>
        //                                     {Math.floor(stat.number)}
        //                                 </div>
        //                                 <div className={styles.statisticCardTitle}>
        //                                     {stat[`name_${i18n.language}`]}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </div>
        //                 </div>
        //             )}

        //             <div className={styles.section}>
        //                 <div
        //                     className={`${styles.accordionHeader} ${
        //                         openAccordion === "tasks" ? styles.active : ""
        //                     }`}
        //                     onClick={() => handleAccordionToggle("tasks")}
        //                 >
        //                     <span className={styles.accordionTitle}>
        //                         {i18n.t("accordionHeaderTasks")}
        //                     </span>
        //                     <span className={styles.accordionIcon}>
        //                         {openAccordion === "tasks"
        //                             ? i18n.t("accordionToggleClose")
        //                             : i18n.t("accordionToggleOpen")}
        //                     </span>
        //                 </div>
        //                 {openAccordion === "tasks" && (
        //                     <div className={styles.accordionContent}>
        //                         <div
        //                             dangerouslySetInnerHTML={{
        //                                 __html: renderContent("tasks"),
        //                             }}
        //                         />
        //                     </div>
        //                 )}
        //             </div>

        //             <div className={styles.section}>
        //                 <div
        //                     className={`${styles.accordionHeader} ${
        //                         openAccordion === "scientificactivity" ? styles.active : ""
        //                     }`}
        //                     onClick={() => handleAccordionToggle("scientificactivity")}
        //                 >
        //                     <span className={styles.accordionTitle}>
        //                         {i18n.t("accordionHeaderScientificActivity")}
        //                     </span>
        //                     <span className={styles.accordionIcon}>
        //                         {openAccordion === "scientificactivity"
        //                             ? i18n.t("accordionToggleClose")
        //                             : i18n.t("accordionToggleOpen")}
        //                     </span>
        //                 </div>
        //                 {openAccordion === "scientificactivity" && (
        //                     <div className={styles.accordionContent}>
        //                         <div
        //                             dangerouslySetInnerHTML={{
        //                                 __html: renderContent("scientificactivity"),
        //                             }}
        //                         />
        //                     </div>
        //                 )}
        //             </div>

        //             <div className={styles.section}>
        //                 <div
        //                     className={`${styles.accordionHeader} ${
        //                         openAccordion === "basetwo" ? styles.active : ""
        //                     }`}
        //                     onClick={() => handleAccordionToggle("basetwo")}
        //                 >
        //                     <span className={styles.accordionTitle}>
        //                         {i18n.t("accordionHeaderLabs")}
        //                     </span>
        //                     <span className={styles.accordionIcon}>
        //                         {openAccordion === "basetwo"
        //                             ? i18n.t("accordionToggleClose")
        //                             : i18n.t("accordionToggleOpen")}
        //                     </span>
        //                 </div>
        //                 {openAccordion === "basetwo" && (
        //                     <div className={styles.accordionContent}>
        //                         <div
        //                             dangerouslySetInnerHTML={{
        //                                 __html: renderContent("basetwo"),
        //                             }}
        //                         />
        //                     </div>
        //                 )}
        //             </div>

        //             {restOfTheStaff && restOfTheStaff.length > 0 && (
        //                 <div className={styles.section}>
        //                     <h3 className={styles.staffSliderTitle}>
        //                         {i18n.t("staffSliderTitle")}
        //                     </h3>
        //                     <Slider
        //                         {...{
        //                             dots: true,
        //                             infinite: true,
        //                             speed: 500,
        //                             slidesToShow: 3,
        //                             slidesToScroll: 1,
        //                             responsive: [
        //                                 {
        //                                     breakpoint: 1024,
        //                                     settings: {
        //                                         slidesToShow: 2,
        //                                         slidesToScroll: 1,
        //                                         infinite: true,
        //                                         dots: true,
        //                                     },
        //                                 },
        //                                 {
        //                                     breakpoint: 600,
        //                                     settings: {
        //                                         slidesToShow: 1,
        //                                         slidesToScroll: 1,
        //                                     },
        //                                 },
        //                             ],
        //                         }}
        //                     >
        //                         {restOfTheStaff.map((staff) => (
        //                             <div key={staff.id} className={styles.staffCard}>
        //                                 {staff.image && (
        //                                     <img
        //                                         src={staff.image}
        //                                         alt={staff[`full_name_${i18n.language}`]}
        //                                         className={styles.staffCardImage}
        //                                     />
        //                                 )}
        //                                 <div className={styles.staffCardBody}>
        //                                     <p className={styles.staffCardName}>
        //                                         {staff[`full_name_${i18n.language}`]}
        //                                     </p>
        //                                     <p className={styles.staffCardOccupation}>
        //                                         {staff[`occupation_${i18n.language}`]}
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </Slider>
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        //     <div className={styles.sidebar}>
        //         <h3>{i18n.t("university")}</h3>
        //         <ul>
        //             <li onClick={() => navigate("/about")} className={styles.active}>
        //                 <span className={styles.icon}>▶</span>
        //                 {i18n.t("about_university")}
        //             </li>
        //             <li onClick={() => navigate("/management")}>{i18n.t("management")}</li>
        //             <li onClick={() => navigate("/structure")}>{i18n.t("structure")}</li>
        //             <li onClick={() => navigate("/international-cooperation")}>
        //                 {i18n.t("international_cooperation")}
        //             </li>
        //             <li
        //                 className={styles}
        //                 onClick={() => navigate("/faculty-kafedra")}
        //             >
        //                 {i18n.t("faculties")}
        //             </li>
        //             <li onClick={() => navigate("/anons")}>{i18n.t("events")}</li>
        //             <li
        //                 onClick={() => navigate("/statistics")}
        //                 className={styles.dropdownToggle}
        //             >
        //                 {i18n.t("statistics")}
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    );
};

export default FakultetKafedraSlug;

