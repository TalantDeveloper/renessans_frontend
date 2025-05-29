import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import styles from "./Laboratory.module.css";

const LaboratoryEnhanced = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    theme: "",
    goal: "",
    pdf_file: null,
    worksheet_link: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sayt.renessans-edu.uz/api/laboratory/"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching laboratory data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, pdf_file: e.target.files[0] });
  };

  const openModal = (item = null) => {
    if (item) {
      setForm({
        id: item.id,
        title: item.title,
        theme: item.theme,
        goal: item.goal,
        pdf_file: null,
        worksheet_link: item.worksheet_link,
      });
    } else {
      setForm({
        id: null,
        title: "",
        theme: "",
        goal: "",
        pdf_file: null,
        worksheet_link: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveChanges = async () => {
    const formData = new FormData();

    if (form.title) formData.append("title", form.title);
    if (form.theme) formData.append("theme", form.theme);
    if (form.goal) formData.append("goal", form.goal);
    if (form.worksheet_link)
      formData.append("worksheet_link", form.worksheet_link);
    if (form.pdf_file) formData.append("pdf_file", form.pdf_file);

    try {
      if (form.id) {
        await axios.put(
          `https://sayt.renessans-edu.uz/api/laboratory/${form.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "https://sayt.renessans-edu.uz/api/laboratory/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error(
        "Error saving laboratory data:",
        error.response?.data || error.message
      );
    }
  };

  const deleteItem = async (id) => {
    if (
      window.confirm("Ushbu laboratoriyani o'chirishga ishonchingiz komilmi?")
    ) {
      try {
        await axios.delete(
          `https://sayt.renessans-edu.uz/api/laboratory/${id}/`
        );
        fetchData();
      } catch (error) {
        console.error("Error deleting laboratory data:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Laboratoriyalar</h1>
      <button className={styles.addButton} onClick={() => openModal()}>
        <FaPlus /> Yangi Qo'shish
      </button>
      <div className={styles.cardsContainer}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>{item.title}</div>
            <div className={styles.cardBody}>
              <p>
                <strong>Mavzu:</strong> {item.theme}
              </p>
              <p>
                <strong>Maqsad:</strong> {item.goal}
              </p>
              <p className={styles.integrated}>
                {item.pdf_file ? (
                  <a
                    href={item.pdf_file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF Fayl
                  </a>
                ) : (
                  "Yo'q"
                )}
                <i>Ko'rish uchun PDF File ustiga bosing</i>
              </p>
              <p className={styles.integrated}>
                <a
                  href={item.worksheet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Worksheet
                </a>
                <i>Ko'rish uchun Worksheet ustiga bosing</i>
              </p>
            </div>
            <div className={styles.actionButtons}>
              <button
                onClick={() => openModal(item)}
                className={styles.editBtn}
              >
                <FaEdit /> Tahrirlash
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className={styles.deleteBtn}
              >
                <FaTrash /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{form.id ? "Tahrirlash" : "Yangi Qo'shish"}</h2>
            <input
              type="text"
              name="title"
              placeholder="Sarlavha"
              value={form.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="theme"
              placeholder="Mavzu"
              value={form.theme}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="goal"
              placeholder="Maqsad"
              value={form.goal}
              onChange={handleInputChange}
            />
            <input type="file" name="pdf_file" onChange={handleFileChange} />
            <input
              type="text"
              name="worksheet_link"
              placeholder="Worksheet URL"
              value={form.worksheet_link}
              onChange={handleInputChange}
            />
            <div className={styles.modalActions}>
              <button onClick={saveChanges} className={styles.saveBtn}>
                Saqlash
              </button>
              <button onClick={closeModal} className={styles.cancelBtn}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratoryEnhanced;
