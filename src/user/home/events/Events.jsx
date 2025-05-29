import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EventCard from "./components/eventCard/EventCard"; // Assuming you have this
import { EventModal } from "./components/eventModal/eventModal"; // Assuming you have this
import ParticlesConfig from "../../../shared/components/particles/particles-config";
import classes from "./Events.module.css";
import { BaseURL } from "../BaseData";

const API_URL = BaseURL + "api/announcement/";

const Events = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);

  useEffect(() => {
    // Fetching announcement data
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(API_URL);
        const filteredAnnouncements = response.data
          .filter(
            (announcement) => new Date(announcement.finishing_time) > new Date() // Filter out finished announcements
          )
          .sort((a, b) => (a.is_main === b.is_main ? 0 : a.is_main ? -1 : 1)); // Main announcements first

        setAnnouncements(filteredAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const onClickOpenModal = (eventName) => {
    setSelectedEvent(eventName);
    setOpenModal(true);
  };

  return (
    <div id="event" className={classes["wrapper"]}>
      <ParticlesConfig idName="events_tsparticles" />
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
        {!seeMoreClicked && (
          <button
            onClick={() => setSeeMoreClicked(true)}
            className={classes["btn"]}
          >
            {t(`eventsBtn`)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Events;
