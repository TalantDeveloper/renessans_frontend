import React, {useState, useEffect} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";
import { testUrl, universities} from "../home/BaseData";
import {useTranslation} from "react-i18next";
import classes from "./Management.module.css";
import Rektor from "./Rektor.png"; // Default image for empty or missing image

const Rahbariyat = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState({});
    const [leadersData, setLeadersData] = useState([]);// State to hold API data
    const page_id_test = 1;

    useEffect(() => {
        // Fetch data from API
        axios
            .get(testUrl + "/api/rectors/")
            .then((response) => {
                setLeadersData(response.data); // Store API data in state
            })
            .catch((error) => {
                console.error("There was an error fetching the staff data!", error);
            });
    }, []);

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
    return (
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>
                <h1 className={classes["page-title"]}>{t("rahbariyat")}</h1>

                {leadersData.length > 0 ? (
                    leadersData.map((leader, index) => (
                        <div
                            className={`${classes.card} ${
                                index === 0 ? classes.highlightedCard : ""
                            }`}
                            key={leader.id}
                        >
                            <div
                                className={
                                    index === 0 ? classes.headerRight : classes.headerLeft
                                }
                            >
                                <div className={classes.info}>
                                    <h2>{leader.employee[`name_${i18n.language}`]}</h2>
                                    <p>{leader[`position_${i18n.language}`]}</p>
                                    <div className={classes.contact}>
                                        <div className={classes.contactItem}>
                                            <FaPhoneAlt className={classes.icon}/>
                                            <span>{leader.employee.phone}</span>
                                        </div>
                                        <div className={classes.contactItem}>
                                            <FaEnvelope className={classes.icon2}/>
                                            <span>{leader.employee.email}</span>
                                        </div>
                                    </div>
                                    <div className={classes.buttons}>
                                        <button
                                            className={classes.button}
                                            onClick={() => toggleDropdown(leader.id, "activities")}
                                        >
                                            {t("work_experience")}{" "}
                                            {openDropdown[leader.id]?.activities ? (
                                                <FaChevronUp/>
                                            ) : (
                                                <FaChevronDown/>
                                            )}
                                        </button>
                                        <button
                                            className={classes.button}
                                            onClick={() =>
                                                toggleDropdown(leader.id, "responsibilities")
                                            }
                                        >
                                            {t("tasks")}{" "}
                                            {openDropdown[leader.id]?.responsibilities ? (
                                                <FaChevronUp/>
                                            ) : (
                                                <FaChevronDown/>
                                            )}
                                        </button>
                                    </div>
                                    <div
                                        className={`${classes.dropdownContent} ${
                                            openDropdown[leader.id]?.activities ? classes.show : ""
                                        }`}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: leader.employee[`about_${i18n.language}`],
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`${classes.dropdownContent} ${
                                            openDropdown[leader.id]?.responsibilities
                                                ? classes.show
                                                : ""
                                        }`}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: leader.employee[`specialization_${i18n.language}`],
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className={classes.imageWrapper}>
                                    <img
                                        src={leader.employee.image || Rektor} // Fallback to default image if not available
                                        alt={leader.employee[`name_${i18n.language}`]}
                                        className={classes.logo}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t("loading")}</p>
                )}
            </div>

            <div className={classes.sidebar}>

                <h3>{t("university")}</h3>
                <ul>
                    {universities.map((item, index) => (
                        (index === page_id_test ? (
                            <li className={classes.active} onClick={() => navigate(item.path)}>
                                <span className={classes.icon}>
                                    ▶
                                </span>
                                {t(item.text)}
                            </li>
                        ) : (
                            <li onClick={() => navigate(item.path)}>
                                {t(item.text)}
                            </li>
                        ))
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Rahbariyat;