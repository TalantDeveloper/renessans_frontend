import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Journal.module.css";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedJournal, setEditedJournal] = useState({
    title: "",
    description: "",
    article_count: 0,
    image: null,
    file_upload: null,
  });

  useEffect(() => {
    axios
      .get("https://sayt.renessans-edu.uz/api/journals/")
      .then((response) => setJournals(response.data))
      .catch((error) => console.error("Error fetching journal data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJournal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setEditedJournal((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editedJournal.title);
    formData.append("description", editedJournal.description);
    formData.append("article_count", editedJournal.article_count);
    if (editedJournal.image) formData.append("image", editedJournal.image);
    if (editedJournal.file_upload)
      formData.append("file_upload", editedJournal.file_upload);

    if (isEditing) {
      console.log("Updating Journal:", editedJournal);
    } else {
      console.log("Creating New Journal:", editedJournal);
      axios
        .post("https://sayt.renessans-edu.uz/api/journals/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setJournals((prev) => [...prev, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error creating journal:", error));
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Bu jurnalni o‘chirishga ishonchingiz komilmi?"
    );
    if (isConfirmed) {
      axios
        .delete(`https://sayt.renessans-edu.uz/api/journals/${id}/`)
        .then(() => {
          setJournals((prev) => prev.filter((journal) => journal.id !== id));
        })
        .catch((error) => console.error("Error deleting journal:", error));
    }
  };

  const openModalToAdd = () => {
    setEditedJournal({
      title: "",
      description: "",
      article_count: 0,
      image: null,
      file_upload: null,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openModalToEdit = (journal) => {
    setEditedJournal({
      title: journal.title,
      description: journal.description,
      article_count: journal.article_count,
      image: null,
      file_upload: null,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={openModalToAdd}>
        Yangi jurnal qo'shish
      </button>

      <div className={styles.journalsList}>
        {journals.map((journal) => (
          <div key={journal.id} className={styles.journalDetails}>
            <h1 className={styles.title}>{journal.title}</h1>
            <p className={styles.description}>Tavsifi: {journal.description}</p>
            <img
              src={journal.image}
              alt={journal.title}
              className={styles.image}
            />
            <p className={styles.articleCount}>
              Maqolalar: {journal.article_count}
            </p>
            <a
              href={journal.file_upload}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadLink}
            >
              Jurnal faylini yuklab olish
            </a>
            <button
              className={styles.editButton}
              onClick={() => openModalToEdit(journal)}
            >
              Tahrirlash
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(journal.id)}
            >
              O'chirish
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>
              {isEditing ? "Tahrirlash" : "Yangi jurnal qo'shish"}
            </h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                  Sarlavha
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedJournal.title}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  Tavsifi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editedJournal.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="article_count" className={styles.label}>
                  Maqolalar soni
                </label>
                <input
                  type="number"
                  id="article_count"
                  name="article_count"
                  value={editedJournal.article_count}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.label}>
                  Rasimni yuklash
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="file_upload" className={styles.label}>
                  Faylni yuklash
                </label>
                <input
                  type="file"
                  id="file_upload"
                  name="file_upload"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelButton}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
