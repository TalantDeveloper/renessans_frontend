import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LottieView from "lottie-react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {
    FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp, FaCalendarDay,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./FakultetKafedraSlug.module.css";
import classerror from "../../../shared/pages/Error404Page.module.css";
import Error404Animation from "../../../shared/assets/animated-placeholders/Error404.json";
import {testUrl} from "../BaseData";

const FakultetKafedraSlug = () => {
    const navigate = useNavigate();
    const {short_name} = useParams();
    const {t, i18n} = useTranslation();
    const [fakultet, setFakultet] = useState(null);
    const [boss, setBoss] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [fakultetlar, setFakultetlar] = useState([]);
    const [kafedralar, setKafedralar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState({});

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchFacultyData = axios.get(
            testUrl + "/api/faculties/" + short_name
        );

        Promise.all([fetchFacultyData])
            .then(([facultyResponse]) => {
                const faculty = facultyResponse.data;
                if (faculty) {
                    setFakultet(faculty.fakultet);
                    setFakultetlar(faculty.fakultetlar || []);
                    setBoss(faculty.boss?.[0] || null);
                    setEmployees(faculty.employees || []);
                    setKafedralar(faculty.kafedralar || [])
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
    if (error) return (
        <div className={classerror["error-page"]}>
            <LottieView className={classerror["animation"]}
                        animationData={Error404Animation}
                        loop={true}
            />
            <p className={classerror["title"]}>
                {t("sorry")}
            </p>
            <p className={classerror["description"]}>
                {t("back_main")}
            </p>
            <div onClick={() => navigate("/")} className={classerror["button"]}>
                {t("main_menu")}
            </div>
        </div>
    )

    return (

        <div className={classes.mainContainer}>
            <div className={classes["sidebar-wrapper"]}>
                <div className={classes.sidebar}>
                    <h3>
                        {t("Fakultetlar")}
                    </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {fakultetlar.length > 0 ? (
                            fakultetlar.map((fakultet, index) => (
                                <li
                                    onClick={() => navigate(`/faculties/${fakultet.short_name}`)}
                                    key={fakultet.id}
                                    style={{marginBottom: '10px'}}
                                    className={fakultet.short_name === short_name ? classes.active : ''}
                                >
                                    <span style={{
                                        marginRight: '8px',
                                        color: '#133654',
                                        fontWeight: 'bold'
                                    }}>
                                        {index + 1}.
                                    </span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(fakultet)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>{t("no_faculties_found")}</li>
                        )}
                    </ul>
                </div>
            </div>

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
                {boss &&
                    <div className={`${classes.card}`} key={boss.employee?.id}>
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
                                <div className={classes.employeeButtons}>
                                    <button
                                        className={classes.employeeButton}
                                        onClick={() => toggleDropdown(boss.employee?.id, "activities")}>
                                        {t("about_employee")}
                                        {openDropdown[boss.employee?.id]?.activities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                    <button
                                        className={classes.employeeButton}
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
                                <img src={boss.employee?.image} // Fallback to default image if not available
                                     alt={boss.employee[`name_${i18n.language}`]}
                                     className={classes.logo}/>
                            </div>
                        </div>
                    </div>
                }
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
                                <div className={classes.employeeButtons}>
                                    <button className={classes.employeeButton}
                                            onClick={() => toggleDropdown(employee.employee.id, "activities")}>
                                        {t("about_employee")}
                                        {openDropdown[employee.employee.id]?.activities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                    <button className={classes.employeeButton}
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
                                <img src={employee.employee?.image} // Fallback to default image if not available
                                     alt={employee.employee[`name_${i18n.language}`]}
                                     className={classes.logo}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

            <div className={classes["sidebar-wrapper"]}>
                <div className={classes.sidebar}>
                    <h3>
                        {fakultet && getDepartmentName(fakultet)}
                        {` ${t("kafedralari")}`}
                    </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {kafedralar.length > 0 ? (
                            kafedralar.map((kafedra, index) => (
                                <li
                                    onClick={() => navigate(`/departments/${kafedra.short_name}`)}
                                    key={kafedra.id}
                                    style={{marginBottom: '10px'}}
                                    className={kafedra.short_name === short_name ? classes.active : ''}
                                >
                                    <span style={{
                                        marginRight: '8px',
                                        color: '#133654',
                                        fontWeight: 'bold'
                                    }}>{index + 1}.</span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(kafedra)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>{t("no_departments_found")}</li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default FakultetKafedraSlug;

