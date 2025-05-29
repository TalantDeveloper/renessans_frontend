import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUniversity, FaChartBar, FaProjectDiagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import styles from "./Statistics.module.css";

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const [statistics, setStatistics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);
  const [formData, setFormData] = useState({
    name_uz: "",
    name_ru: "",
    name_en: "",
    number: "",
  });

  const apiUrl = "https://sayt.renessans-edu.uz/api/ourStatistics/";

  // Fetch statistics data (GET)
  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStatistics(response.data);
    } catch (error) {
      console.error("Statistikalarni yuklashda xato:", error);
    }
  };

  // Delete statistic (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}${id}/`);
      setStatistics((prev) => prev.filter((stat) => stat.id !== id));
    } catch (error) {
      console.error("Statistikani o'chirishda xato:", error);
    }
  };

  // Save statistic (add or edit)
  const handleSave = async () => {
    try {
      if (currentStat) {
        // Update existing statistic
        const response = await axios.put(
          `${apiUrl}${currentStat.id}/`,
          formData
        );
        setStatistics((prev) =>
          prev.map((stat) =>
            stat.id === currentStat.id ? response.data : stat
          )
        );
      } else {
        // Add new statistic
        const response = await axios.post(apiUrl, formData);
        setStatistics((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Statistikani saqlashda xato:", error);
    }
  };

  const openModal = (stat = null) => {
    setCurrentStat(stat);
    setFormData(
      stat
        ? {
            name_uz: stat.name_uz,
            name_ru: stat.name_ru,
            name_en: stat.name_en,
            number: stat.number,
          }
        : { name_uz: "", name_ru: "", name_en: "", number: "" }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStat(null);
    setFormData({ name_uz: "", name_ru: "", name_en: "", number: "" });
  };

  const getLocalizedName = (stat) => {
    const lang = i18n.language;
    switch (lang) {
      case "uz":
        return stat.name_uz;
      case "ru":
        return stat.name_ru;
      case "en":
        return stat.name_en;
      default:
        return stat.name_uz; // Default to Uzbek
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>RTU raqamlarda</h1>
      <button className={styles.addButton} onClick={() => openModal()}>
        Statistika qo'shish
      </button>
      <div className={styles.statList}>
        {statistics.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.iconContainer}>
              {stat.name_uz === "Fakultetlar" && (
                <FaUniversity className={styles.icon} />
              )}
              {stat.name_uz === "Ilmiy salohiyat" && (
                <FaChartBar className={styles.icon} />
              )}
              {stat.name_uz === "Yo'nalishlar soni" && (
                <FaProjectDiagram className={styles.icon} />
              )}
            </div>
            <h3 className={styles.statName}>{getLocalizedName(stat)}</h3>
            <p className={styles.statNumber}>{stat.number}</p>
            <div className={styles.actions}>
              <button
                onClick={() => openModal(stat)}
                className={`${styles.editButton} ${styles.actionButton}`}
              >
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(stat.id)}
                className={`${styles.deleteButton} ${styles.actionButton}`}
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {currentStat ? "Tahrirlsh" : "Qo'shish"}
            </h2>
            <label className={styles.modalLabel}>
              Nomi (UZ):
              <input
                type="text"
                value={formData.name_uz}
                onChange={(e) =>
                  setFormData({ ...formData, name_uz: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Nomi (RU):
              <input
                type="text"
                value={formData.name_ru}
                onChange={(e) =>
                  setFormData({ ...formData, name_ru: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Nomi (ENG):
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) =>
                  setFormData({ ...formData, name_en: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Soni:
              <input
                type="text"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.saveButton}>
                Saqlash
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
