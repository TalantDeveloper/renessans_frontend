import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import styles from "./Events.module.css";

// Set the app element for accessibility
ReactModal.setAppElement("#root");

const fetchEvents = async () => {
  const response = await fetch("https://sayt.renessans-edu.uz/api/events/");
  return response.json();
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    time: "",
    when_it_begins: "",
  });

  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
    setNewEvent({ title: "", location: "", time: "", when_it_begins: "" });
    setCurrentEvent(null);
  };

  const openAddModal = () => {
    setCurrentEvent(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...newEvent,
      time: new Date(newEvent.time).toISOString(),
      when_it_begins: new Date(newEvent.when_it_begins).toISOString(),
    };

    const url = currentEvent
      ? `https://sayt.renessans-edu.uz/api/events/${currentEvent.id}/`
      : "https://sayt.renessans-edu.uz/api/events/";

    const method = currentEvent ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    if (response.ok) {
      const updatedEvent = await response.json();
      if (currentEvent) {
        setEvents(
          events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
      } else {
        setEvents([...events, updatedEvent]);
      }
      closeModal();
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setNewEvent({
      title: event.title,
      location: event.location,
      time: new Date(event.time).toISOString().slice(0, 16),
      when_it_begins: new Date(event.when_it_begins).toISOString().slice(0, 16),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham ushbu tadbirni o‘chirmoqchimisiz?")) {
      await fetch(`https://sayt.renessans-edu.uz/api/events/${id}/`, {
        method: "DELETE",
      });
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Kelgusi Tadbirlar</h1>
      <button onClick={openAddModal} className={styles.btnAdd}>
        <FaPlus /> Yangi Tadbir Qo‘shish
      </button>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sarlavha</th>
              <th>Joylashuv</th>
              <th>Vaqt</th>
              <th>Boshlanish Vaqti</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{new Date(event.time).toLocaleString()}</td>
                <td>{new Date(event.when_it_begins).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(event)}
                    className={styles.btnEdit}
                  >
                    <FaEdit /> Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className={styles.btnDelete}
                  >
                    <FaTrashAlt /> O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.modalTitle}>
          {currentEvent ? "Tadbirni Tahrirlash" : "Yangi Tadbir Qo‘shish"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Sarlavha</label>
            <input
              type="text"
              name="title"
              placeholder="Tadbir nomi"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Joylashuv</label>
            <input
              type="text"
              name="location"
              placeholder="Joy nomi"
              value={newEvent.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Vaqt</label>
            <input
              type="datetime-local"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Boshlanish Vaqti</label>
            <input
              type="datetime-local"
              name="when_it_begins"
              value={newEvent.when_it_begins}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.btnSubmit}>
              {currentEvent ? "O‘zgarishlarni Saqlash" : "Tadbir Qo‘shish"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={styles.btnCancel}
            >
              Bekor Qilish
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default Events;
