import React, {useEffect, useState} from "react";
import axios from "axios";
import {FaClock, FaMapMarkerAlt} from "react-icons/fa";
import classes from "./Avloniy.module.css";
import styles from "./Avloniy.module.css";
import moment from "moment";
import "moment/locale/uz-latn"; // Import the locale
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next"; // Importing useTranslation
import {testUrl, universities} from "../BaseData";

const Timeline = () => {
    const [events, setEvents] = useState([]);
    const {t, i18n} = useTranslation(); // Destructure t and i18n for translations
    const navigate = useNavigate();
    const page_id_test = 0;

    useEffect(() => {
        // Fetch the events data from the API
        axios
            .get(testUrl + "/api/events/")
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className={styles["mainContainer"]}>
            <div data-aos="fade-up" className={styles.container}>
                <div className={styles.timelineLine}>
                </div>
                {events.length === 0 ? (
                    <p>
                        {t("noEventsAvailable")}
                    </p> // Use translation for no events
                ) : (events.map((event) => {
                    const whenItBeginsDate = moment(event.when_it_begins).locale("uz-latn"); // Use moment with locale
                    return (
                        <div key={event.id} className={styles.eventCard}>
                            <div className={styles.dateBox}>
                                    <span className={styles.day}>
                                        {whenItBeginsDate.format("DD")}
                                    </span>
                                <span className={styles.month}>
                                        {whenItBeginsDate.format("MMMM")}
                                    </span>
                                <span className={styles.year}>
                                        {whenItBeginsDate.format("YYYY")}
                                    </span>
                            </div>
                            <div className={styles.contentBox}>
                                <h3 className={styles.title}>
                                    {t(`events.title_${i18n.language}`, {
                                        defaultValue: event[`title_${i18n.language}`] || event.title_en,
                                    })}
                                </h3>
                                <div className={styles.info}>
                                    <div className={styles.location}>
                                        <FaMapMarkerAlt/>{" "}
                                        <span>
                                                {t(`events.location_${i18n.language}`, {
                                                    defaultValue: event[`location_${i18n.language}`] || event.location_en,
                                                })}
                                            </span>
                                    </div>
                                    <div className={styles.time}>
                                        <FaClock/>{" "}
                                        <span>{whenItBeginsDate.format("DD-MMMM, HH:mm")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }))
                }
            </div>
            <div className={classes.sidebar}>
                <h3>
                    {t("university")}
                </h3>
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
        </div>)
        ;
};

export default Timeline;
