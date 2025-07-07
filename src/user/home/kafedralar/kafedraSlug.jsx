import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp, FaCalendarDay} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./kafedraSlug.module.css";
// import classerror from "../../../Error404Page.module.css";
// import Error404Animation from "../../../Error404.json";
import { testUrl } from "../BaseData";

import IlmiySalohiyat from "./IlmiySalohiyat.png";
import ProfessorOqituvchilar from "./ProfessorOqituvchilar.png";
import TalabalarSoni from "./TalabalarSoni.png";
import OquvQollanmaVaDarsliklar from "./OquvQollanmaVaDarsliklar.png";
import FanDoktori from "./FanDoktori.png";
import FalsafaDoktori from "./FalsafaDoktori.png";
import XalqaroHamkorliklar from "./XalqaroHamkorliklar.png";
import Maqolalar from "./Maqolalar.png";
const IconNames = {
    "IlmiySalohiyat": IlmiySalohiyat,
    "ProfessorOqituvchilar": ProfessorOqituvchilar,
    "TalabalarSoni": TalabalarSoni,
    "OquvQollanmaVaDarsliklar": OquvQollanmaVaDarsliklar,
    "FanDoktori": FanDoktori,
    "FalsafaDoktori": FalsafaDoktori,
    "XalqaroHamkorliklar": XalqaroHamkorliklar,
    "Maqolalar": Maqolalar
}

const KafedraSlug = () => {
    const navigate = useNavigate();
    const { short_name } = useParams();
    console.log(short_name);
    const {t, i18n } = useTranslation();
    const [kafedra, setKafedra] = useState(null);
    const [fakultet, setFakultet] = useState(null);
    const [boss, setBoss] = useState(null);
    const [employees, setEmployees] = useState([]);
    // const [fakultetlar, setFakultetlar] = useState([]);
    const [kafedralar, setKafedralar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(error);
    const [openDropdown, setOpenDropdown] = useState({});
    const [results, setResults] = useState([]);
    console.log(results);
    const [directionsData, setDirectionsData] = useState([]);
    const [backendSidebarData, setBackendSidebarData] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchKafedraData = axios.get(
            testUrl + "/api/departments/" + short_name
        );
        
        const fetchBackendSidebarData = axios.get(
            testUrl + "/api/activitiescategory" // Replace with your actual endpoint
        );
        
        // const fetchStatistics = async () => {
        //     try {
        //         const response = await fetch(
        //             BaseURL + "api/ourStatistics/"
        //         );
        //         const data = await response.json();
        //         setStatistics(data);
        //     } catch (error) {
        //         console.error("Error fetching statistics:", error);
        //     }
        // };

        Promise.all([fetchKafedraData, fetchBackendSidebarData])
            .then(([kafedraResponse, sidebarResponse]) => {
                const kafedra = kafedraResponse.data;
                if (kafedra) {
                    console.log(kafedra);
                    setKafedra(kafedra.kafedra);
                    setKafedralar(kafedra.kafedralar || []);
                    setFakultet(kafedra.fakultet?.[0] || null);
                    setResults(kafedra.results || []);
                    setBoss(kafedra.boss?.[0] || null);
                    setEmployees(kafedra.employees || []);
                    setDirectionsData(kafedra.directions || []);
                    // setKafedralar(faculty.kafedralar || [])
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
                
                // Set backend sidebar data
                if (sidebarResponse.data) {
                    setBackendSidebarData(sidebarResponse.data);
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
                statistics: type === "statistics" ? !prev[id]?.statistics : false,
                directions: type === "directions" ? !prev[id]?.directions : false,
            },
        }));
    };

    const getDepartmentName = (kafedra) => {
        const title = kafedra[`name_${i18n.language}`];
        return title || kafedra.name_uz || t("no_name_available");
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
            <div className={classes.sidebar}>
                    
                    <h3 className={classes["sidebar-title"]}>
                        {fakultet[`name_${i18n.language}`]}
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
                                    <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(kafedra)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>{t("no_kafedra_found")}</li>
                        )}
                    </ul>
                </div>
            
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>
            
                <h1 className={classes["page-title"]}>
                    {kafedra[`name_${i18n.language}`]}
                </h1>
                {/* <img src={fakultet?.image} alt="" /> */}
                <div dangerouslySetInnerHTML={{
                    __html: kafedra[`content_${i18n.language}`],
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
                            <img src={
                                boss.employee?.image} // Fallback to default image if not available
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

            <div className={classes["sidebar-wrapper"]}>
                <div className={classes.sidebar}>
                    <div className={classes.buttons}>
                        <button
                            className={classes.button}
                            onClick={() => toggleDropdown("statistics", "statistics")}>
                            {t("Statistik ko'rsatgichlar")}
                            {openDropdown["statistics"]?.statistics ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>
                    </div>
                    <div className={`${classes.dropdownContent} ${
                        openDropdown["statistics"]?.statistics ? classes.show : ""
                    }`}>
                        {results.length > 0 ? (
                            <div>
                                {results.map((result, index) => (
                                    <div key={index + 1} className={classes.statItem}>
                                        <div className={classes.statIconContainer}>
                                            <img
                                                src={IconNames[`${result.statistical?.icon_name}`]}
                                                alt=""
                                                className={classes.statIcon}
                                            />
                                        </div>
                                        <div className={classes.statContent}>
                                            <div className={classes.statNumber}>
                                                {result?.result}
                                            </div>
                                            <div className={classes.statLabel}>
                                                {result.statistical[`name_${i18n.language}`]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{textAlign: 'center'}}>{t("No statistics available.")}</p>
                        )}
                    </div>
                </div>

                <div className={classes.sidebar}>
                    <div className={classes.buttons}>
                        <button
                            className={classes.button}
                            onClick={() => toggleDropdown("directions", "directions")}>
                            {t("Yo'nalishlar")}
                            {openDropdown["directions"]?.directions ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>
                    </div>
                    <div className={`${classes.dropdownContent} ${
                        openDropdown["directions"]?.directions ? classes.show : ""
                    }`}>
                        <div>
                        {directionsData.length > 0 ? (
                                directionsData.map((direction, index) => (
                                <li
                                    onClick={() => navigate(`/directions/${direction.short_name}`)}
                                    key={direction.id}
                                    style={{marginBottom: '10px'}}
                                >
                                    <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654', fontWeight: "bold"}}
                                    >
                                        {getDepartmentName(direction)}
                                    </span>
                                </li>
                            ))
                        
                            
                            
                        ) : (
                            <p style={{textAlign: 'center'}}>{t("No directions available.")}</p>
                        )}
                        </div>
                    </div>
                </div>
                
                {/* Duplicate Sidebar - Inside sidebar-wrapper */}
                <div className={classes.sidebar}>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {backendSidebarData.length > 0 ? (
                            backendSidebarData.map((item, index) => (
                                <li
                                    onClick={() => navigate(`/activities/${short_name}/${item.short_name}/`)}
                                    key={item.id}
                                    style={{marginBottom: '10px'}}
                                    className={item.short_name === short_name ? classes.active : ''}
                                >
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(item)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>{t("no_kafedra_found")}</li>
                        )}
                    </ul>
                </div>
                
                

                

                
                <div className={classes.sidebar}>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {/* {kafedralar.length > 0 ? (
                            kafedralar.map((kafedra, index) => (
                                <li
                                    onClick={() => navigate(`/faculty-kafedra/${kafedra.short_name}`)}
                                    key={kafedra.id}
                                    style={{marginBottom: '10px'}}
                                    className={kafedra.short_name === short_name ? classes.active : ''}
                                >
                                    <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(kafedra)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>{t("no_kafedras_found")}</li>
                        )} */}
                    </ul>
                </div>
            </div>
            
        </div>

        
    );
};

export default KafedraSlug;

