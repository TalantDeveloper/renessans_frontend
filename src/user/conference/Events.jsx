import React, {useEffect, useState} from "react";

import EventCard from "./components/eventCard/EventCard";
import ParticlesConfig from "../../shared/components/particles/particles-config";
import {EventModal} from "./components/eventModal/eventModal";
import {useTranslation} from "react-i18next";
import {BaseURL} from "../home/BaseData";
import classes from "./Events.module.css";

const Events = () => {
    const {t} = useTranslation();
    const [conferences, setConferences] = useState([]);
    const [selectedConference, setSelectedConference] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await fetch(
                    BaseURL + "api/conference/conferences/"
                );
                const data = await response.json();

                const sortedAndFilteredConferences = data
                    .filter((conf) => new Date(conf.date) >= new Date())
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                setConferences(sortedAndFilteredConferences);
            } catch (error) {
                console.error("Error fetching conferences:", error);
            }
        };

        fetchConferences();
    }, []);

    const handleOpenModal = (conference) => {
        setSelectedConference(conference);
        setOpenModal(true);
    };

    const displayedConferences = conferences.slice(0, currentPage * itemsPerPage);

    return (
        <div id="event" className={classes["wrapper"]}>
            <ParticlesConfig idName="events_tsparticles"/>
            <div className={classes["container"]}>
                <h1 className={classes["header"]}>{t("konferensiyalar")}</h1>
                <div className={classes["flex"]}>
                    {displayedConferences.map((conference, index) => (
                        <EventCard
                            key={conference.id}
                            index={index}
                            extraCurricular={conference}
                            onClickOpenModal={() => handleOpenModal(conference)}
                        />
                    ))}
                </div>
                {selectedConference && (
                    <EventModal
                        selectedConference={selectedConference}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                )}

                {displayedConferences.length < conferences.length && (
                    <button
                        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                        className={classes["btn"]}
                    >
                        {t("eventsBtn")}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Events;
