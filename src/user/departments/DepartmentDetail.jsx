import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaChevronDown,
    FaChevronUp, FaCalendarDay
} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme styles
import classes from "./departmentsDetail.module.css";
import classerror from "../../shared/pages/Error404Page.module.css";
import Error404Animation from "../../shared/assets/animated-placeholders/Error404.json";
import {useNavigate} from "react-router-dom";
import LottieView from "lottie-react";
import { testUrl} from "../home/BaseData";
const DepartmentDetails = () => {
    const {short_id} = useParams();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation(); // Access i18n instance
    const [data, setData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [boss, setBoss] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState({});
    console.log(departments);


    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchDepartment = axios.get(
            testUrl + "/api/centers/" + short_id
        );
        Promise.all([fetchDepartment])
            .then(([departmentResponse]) => {
                const responseData = departmentResponse.data;
                if (responseData?.department) {
                    setData(responseData.department);
                    setDepartments(responseData.departments || []);
                    setBoss(responseData.boss?.[0] || null);
                    setEmployees(responseData.employees || []);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [short_id, i18n.language]);

   

    // Get the first staff member
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
 
    const getDepartmentName = (department) => {
        const title = department[`name_${i18n.language}`];
        return title || department.name_uz || t("no_name_available");
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
    if (!data) return <p> </p>;

    return (
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>

                <h1 className={classes["page-title"]}>
                    {data[`name_${i18n.language}`]}
                </h1>
                <div dangerouslySetInnerHTML={{
                    __html: data[`about_${i18n.language}`],
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
                                <img src={employee.employee.image} // Fallback to default image if not available
                                     alt={employee.employee[`name_${i18n.language}`]}
                                     className={classes.logo}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className={classes.sidebar} style={{marginLeft: 0, marginRight: "40px"}}>
                <h3>{t("center")}</h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {departments.length > 0 ? (
                        departments.map((department, index) => (
                            <li
                                onClick={() => navigate(`/centers/${department.short_id}`)}
                                key={department.id}
                                style={{marginBottom: '10px'}}
                                className={department.short_id === short_id ? classes.active : ''}
                            >
                                <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                <span
                                    style={{cursor: 'pointer', color: '#133654'}}
                                >
                                    {getDepartmentName(department)}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>{t("no_departments_found")}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DepartmentDetails;