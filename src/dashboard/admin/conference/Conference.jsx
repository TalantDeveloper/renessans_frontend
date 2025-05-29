import React, { useEffect, useState } from "react";
import styles from "./Conference.module.css";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Conference = () => {
  const [conferences, setConferences] = useState([]);
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentConferenceId, setCurrentConferenceId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Online");
  const [newEventName, setNewEventName] = useState("");
  const [addedEvents, setAddedEvents] = useState([]);

  useEffect(() => {
    fetchConferences();
    fetchEvents();
  }, []);

  const fetchConferences = async () => {
    try {
      const response = await axios.get(
        "https://sayt.renessans-edu.uz/api/conference/"
      );
      setConferences(response.data);
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://sayt.renessans-edu.uz/api/conference/conference-events/"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async () => {
    if (!newEventName) return;
    try {
      const response = await axios.post(
        "https://sayt.renessans-edu.uz/api/conference/conference-events/",
        { name: newEventName }
      );
      const createdEvent = response.data;
      setAddedEvents([...addedEvents, createdEvent]);
      setNewEventName("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const addConference = async () => {
    if (
      !title ||
      !description ||
      !date ||
      !location ||
      addedEvents.length === 0
    ) {
      alert("Please fill all fields and add at least one event.");
      return;
    }
    try {
      const response = await axios.post(
        "https://sayt.renessans-edu.uz/api/conference/",
        {
          title,
          description,
          date,
          location,
          mode,
          conference_event_ids: addedEvents.map((event) => event.id),
        }
      );
      setConferences([...conferences, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error adding conference:", error);
    }
  };

  const editConference = async () => {
    if (
      !title ||
      !description ||
      !date ||
      !location ||
      addedEvents.length === 0
    ) {
      alert("Please fill all fields and add at least one event.");
      return;
    }
    try {
      const response = await axios.put(
        `https://sayt.renessans-edu.uz/api/conference/${currentConferenceId}/`,
        {
          title,
          description,
          date,
          location,
          mode,
          conference_event_ids: addedEvents.map((event) => event.id),
        }
      );
      setConferences(
        conferences.map((conf) =>
          conf.id === currentConferenceId ? response.data : conf
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error editing conference:", error);
    }
  };

  const deleteConference = async (id) => {
    if (!window.confirm("Are you sure you want to delete this conference?"))
      return;
    try {
      await axios.delete(`https://sayt.renessans-edu.uz/api/conference/${id}/`);
      setConferences(conferences.filter((conf) => conf.id !== id));
    } catch (error) {
      console.error("Error deleting conference:", error);
    }
  };

  const openAddModal = () => {
    setModalIsOpen(true);
    setEditMode(false);
    resetForm();
  };

  const openEditModal = (conference) => {
    setModalIsOpen(true);
    setEditMode(true);
    setCurrentConferenceId(conference.id);
    setTitle(conference.title);
    setDescription(conference.description);
    setDate(new Date(conference.date).toISOString().slice(0, 16));
    setLocation(conference.location);
    setMode(conference.mode);
    setAddedEvents(conference.conference_events);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setMode("Online");
    setAddedEvents([]);
    setNewEventName("");
    setCurrentConferenceId(null);
  };

  return (
    <div className={styles.conferenceContainer}>
      <div className={styles.header}>
        <h1>Konferensiyalar</h1>
        <button className={styles.addButton} onClick={openAddModal}>
          <FaPlus /> Konferensiya qo'shish
        </button>
      </div>

      <div className={styles.conferenceList}>
        {conferences.map((conf) => (
          <div key={conf.id} className={styles.conferenceCard}>
            <div className={styles.conferenceInfo}>
              <h3>{conf.title}</h3>
              <p>{conf.description}</p>
              <div className={styles.details}>
                <span>Sana: {new Date(conf.date).toLocaleDateString()}</span>
                <span>Manzil: {conf.location}</span>
                <span>O'tkazilish shakli: {conf.mode}</span>
              </div>
              <div className={styles.events}>
                {conf.conference_events.map((event) => (
                  <span key={event.id} className={styles.eventBadge}>
                    {event.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => openEditModal(conf)}
              >
                <FaEdit /> Tahrirlash
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteConference(conf.id)}
              >
                <FaTrash /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>
              {editMode ? "Konferensiyani tahrirlash" : "Konferensiya qo'shish"}
            </h2>
            <div className={styles.modalContent}>
              <input
                type="text"
                placeholder="Sarlavha"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Tavsifi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Manzil"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <div className={styles.eventSection}>
                <h3>Sho'balar</h3>
                <input
                  type="text"
                  placeholder="Sho'ba nomini kiriting"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
                <button className={styles.addEventButton} onClick={addEvent}>
                  <FaPlus /> Sho'ba qo'shish
                </button>
                <div>
                  {addedEvents.map((event) => (
                    <span key={event.id} className={styles.eventBadge}>
                      {event.name}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className={styles.submitButton}
                onClick={editMode ? editConference : addConference}
              >
                {editMode ? "Yangilash" : "Qo'shish"}
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conference;
