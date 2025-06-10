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
import {BaseURL, testUrl} from "../home/BaseData";
const DepartmentDetails = () => {
    const {short_id} = useParams();
    const navigate = useNavigate();
    console.log(short_id);
    const {t, i18n} = useTranslation(); // Access i18n instance
    const [data, setData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [boss, setBoss] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState({});


    console.log("data", data);
    console.log(employees);

    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchDepartment = axios.get(
            testUrl + "/api/department/department/" + short_id
        );
        Promise.all([fetchDepartment])
            .then(([departmentResponse]) => {
                const responseData = departmentResponse.data;
                if (responseData?.department) {
                    setData(responseData.department);
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
                <h1>
                    {data[`name_${i18n.language}`]}

                </h1>
                <div dangerouslySetInnerHTML={{
                    __html: data[`about_${i18n.language}`],
                }}/>

                {boss && <div className={`${classes.card}`} key={boss?.id}>
                    <div className={classes.headerRight}>
                        <div className={classes.info}>
                            <h2>
                                {boss[`name_${i18n.language}`]}
                            </h2>
                            <p>
                                {boss[`position_${i18n.language}`]}
                            </p>
                            <div className={classes.contact}>
                                <div className={classes.contactItem}>
                                    <FaPhoneAlt className={classes.icon}/>
                                    <span>{boss?.phone}</span>
                                </div>
                                <div className={classes.contactItem}>
                                    <FaEnvelope className={classes.icon2}/>
                                    <span>{boss?.email}</span>
                                </div>
                                <div className={classes.contactItem}>
                                    <FaCalendarDay className={classes.icon}/>
                                    <span>
                                        Ish tajribasi: {boss[`work_experience_${i18n.language}`]}
                                    </span>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                <button
                                    className={classes.button}
                                    onClick={() => toggleDropdown(boss?.id, "activities")}>
                                    Hodim haqida
                                    {openDropdown[boss?.id]?.activities ? (
                                        <FaChevronUp/>
                                    ) : (
                                        <FaChevronDown/>
                                    )}
                                </button>
                                <button
                                    className={classes.button}
                                    onClick={() =>
                                        toggleDropdown(boss?.id, "responsibilities")
                                    }>
                                    Mutaxassisligi
                                    {openDropdown[boss?.id]?.responsibilities ? (
                                        <FaChevronUp/>
                                    ) : (
                                        <FaChevronDown/>
                                    )}
                                </button>
                            </div>
                            <div
                                className={`${classes.dropdownContent} ${
                                    openDropdown[boss?.id]?.activities ? classes.show : ""
                                }`}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: boss[`about_${i18n.language}`],
                                    }}
                                />
                            </div>
                            <div className={`${classes.dropdownContent} ${
                                openDropdown[boss?.id]?.responsibilities
                                    ? classes.show
                                    : ""}`}>
                                <div dangerouslySetInnerHTML={{
                                    __html: boss[`specialization_${i18n.language}`],
                                }}/>
                            </div>
                        </div>
                
                        <div className={classes.imageWrapper}>
                            <img src={testUrl + boss?.image} // Fallback to default image if not available
                                 alt={boss[`name_${i18n.language}`]}
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
                                <h2>{employee[`name_${i18n.language}`]}</h2>
                                <p>{employee[`position_${i18n.language}`]}</p>
                                <div className={classes.contact}>
                                    <div className={classes.contactItem}>
                                        <FaPhoneAlt className={classes.icon}/>
                                        <span>{employee.phone}</span>
                                    </div>
                                    <div className={classes.contactItem}>
                                        <FaEnvelope className={classes.icon2}/>
                                        <span>{employee.email}</span>
                                    </div>
                                </div>
                                <div className={classes.buttons}>
                                    <button className={classes.button}
                                            onClick={() => toggleDropdown(employee.id, "activities")}>
                                        {t("work_experience")}{" "}
                                        {openDropdown[employee.id]?.activities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                    <button className={classes.button}
                                            onClick={() =>
                                                toggleDropdown(employee.id, "responsibilities")
                                            }>
                                        {t("tasks")}{" "}
                                        {openDropdown[employee.id]?.responsibilities ? (
                                            <FaChevronUp/>
                                        ) : (
                                            <FaChevronDown/>
                                        )}
                                    </button>
                                </div>
                                <div className={`${classes.dropdownContent} ${
                                    openDropdown[employee.id]?.activities ? classes.show : ""
                                }`}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: employee[`about_${i18n.language}`],
                                    }}/>
                                </div>
                                <div className={`${classes.dropdownContent} ${
                                    openDropdown[employee.id]?.responsibilities
                                        ? classes.show
                                        : ""
                                }`}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: employee[`about_${i18n.language}`],
                                    }}/>
                                </div>
                            </div>

                            <div className={classes.imageWrapper}>
                                <img src={testUrl + employee.image} // Fallback to default image if not available
                                     alt={employee[`name_${i18n.language}`]}
                                     className={classes.logo}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default DepartmentDetails;