import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import EventCard from "./components/eventCard/EventCard"; // Assuming you have this
import {EventModal} from "./components/eventModal/eventModal"; // Assuming you have this
import ParticlesConfig from "../../../shared/components/particles/particles-config";
import classes from "./Events2.module.css";
import { testUrl} from "../BaseData";
import {useNavigate} from "react-router-dom";

const Events2 = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const fetchAnnouncements = () => {
        setLoading(true);
        axios
            .get(testUrl + "/api/announcementstwo/")
            .then((response) => {
                const sortedAnnouncements = response.data
                    .filter(
                        (announcement) => new Date(announcement.finishing_time) > new Date()
                    )
                    .sort((a, b) => new Date(b.finishing_time) - new Date(a.finishing_time));
                setAnnouncements(sortedAnnouncements);
                // calculateCategoryCounts(setAnnouncements);
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        fetchAnnouncements();
    }, [i18n.language]);


    const onClickOpenModal = (eventName) => {
        setSelectedEvent(eventName);
        setOpenModal(true);
    };

    return (
        <div id="event" className={classes["wrapper"]}>
            <ParticlesConfig idName="events_tsparticles"/>
            <div className={classes["container"]}>
                <h1 className={classes["header"]}>{t(`eventsHeader`)}</h1>
                <div className={classes["flex"]}>
                    {announcements.map((announcement, index) => (
                        <EventCard
                            key={announcement.id}
                            index={index}
                            extraCurricular={announcement}
                            onClickOpenModal={onClickOpenModal}
                        />
                    ))}
                </div>
                <EventModal
                    selectedEvent={selectedEvent}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                />
                <button
                    onClick={() => navigate("/announce")}
                    className={classes["btn"]}>
                    {t(`eventsBtn`)}
                </button>
            </div>
        </div>
    );
};

export default Events2;