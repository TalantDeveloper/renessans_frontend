import React, { useState, useEffect } from "react";
import styles from "./Union.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { style } from "@mui/system";

const Union = () => {
  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ type: null, data: null });

  // Fetch data function
  const fetchData = async () => {
    try {
      const categoryResponse = await fetch(
        "https://sayt.renessans-edu.uz/api/union/categories/"
      );
      const fieldResponse = await fetch(
        "https://sayt.renessans-edu.uz/api/union/fields/"
      );
      const clubResponse = await fetch(
        "https://sayt.renessans-edu.uz/api/union/clubs/"
      );
      const categoriesData = await categoryResponse.json();
      const fieldsData = await fieldResponse.json();
      const clubsData = await clubResponse.json();

      setCategories(categoriesData);
      setFields(fieldsData);
      setClubs(clubsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalOpen = (type, item = null) => {
    setCurrentItem({ type, data: item });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentItem({ type: null, data: null });
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (data, type) => {
    try {
      if (type === "category") {
        if (currentItem.data) {
          await fetch(
            `https://sayt.renessans-edu.uz/api/union/categories/${currentItem.data.id}/`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
        } else {
          await fetch("https://sayt.renessans-edu.uz/api/union/categories/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        }
        fetchData(); // Refresh categories
      } else if (type === "field") {
        if (currentItem.data) {
          await fetch(
            `https://sayt.renessans-edu.uz/api/union/fields/${currentItem.data.id}/`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
        } else {
          await fetch("https://sayt.renessans-edu.uz/api/union/fields/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        }
        fetchData(); // Refresh fields
      } else if (type === "club") {
        if (currentItem.data) {
          await fetch(
            `https://sayt.renessans-edu.uz/api/union/clubs/${currentItem.data.id}/`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...data,
                fields: data.fields.map((fieldId) => parseInt(fieldId)),
              }),
            }
          );
        } else {
          await fetch("https://sayt.renessans-edu.uz/api/union/clubs/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              fields: data.fields.map((fieldId) => parseInt(fieldId)),
            }),
          });
        }
        fetchData(); // Refresh clubs
      }
      handleModalClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm("Rostdan ham o'chirishni xohlaysizmi?")) {
      try {
        if (type === "category") {
          await fetch(
            `https://sayt.renessans-edu.uz/api/union/categories/${id}/`,
            { method: "DELETE" }
          );
          setCategories(categories.filter((category) => category.id !== id));
        } else if (type === "field") {
          await fetch(`https://sayt.renessans-edu.uz/api/union/fields/${id}/`, {
            method: "DELETE",
          });
          setFields(fields.filter((field) => field.id !== id));
        } else if (type === "club") {
          await fetch(`https://sayt.renessans-edu.uz/api/union/clubs/${id}/`, {
            method: "DELETE",
          });
          setClubs(clubs.filter((club) => club.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Klublar Ro'yhati</h1>

      <section className={styles.section}>
        <h2 className={styles.ourtitle}>Kategoriya</h2>
        <button
          className={styles.addButton}
          onClick={() => handleModalOpen("category")}
        >
          Yangi kategoriya Qo'shish <FaPlus />
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomi</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className={styles.integrated}>
                  <FaEdit
                    className={styles.icon}
                    onClick={() => handleModalOpen("category", category)}
                  />
                  <FaTrash
                    className={styles.icon}
                    onClick={() => handleDelete(category.id, "category")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.ourtitle}>Sohalar</h2>
        <button
          className={styles.addButton}
          onClick={() => handleModalOpen("field")}
        >
          Yangi soha Qo'shish <FaPlus />
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomi</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id}>
                <td>{field.id}</td>
                <td>{field.name}</td>
                <td className={styles.integrated}>
                  <FaEdit
                    className={styles.icon}
                    onClick={() => handleModalOpen("field", field)}
                  />
                  <FaTrash
                    className={styles.icon}
                    onClick={() => handleDelete(field.id, "field")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.ourtitle}>Klublar</h2>
        <button
          className={styles.addButton}
          onClick={() => handleModalOpen("club")}
        >
          Yangi Klub Qo'shish <FaPlus />
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomi</th>
              <th>Maqsad</th>
              <th>O'qituvchi</th>
              <th>Kategoriya</th>
              <th>Sohalar</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>{club.id}</td>
                <td>{club.title}</td>
                <td>{club.goal}</td>
                <td>{club.tutor}</td>
                <td>
                  {categories.find((cat) => cat.id === club.category)?.name ||
                    "-"}
                </td>
                <td>
                  {club.fields
                    .map(
                      (fieldId) =>
                        fields.find((field) => field.id === fieldId)?.name ||
                        "-"
                    )
                    .join(", ")}
                </td>
                <td className={styles.integrated}>
                  <FaEdit
                    className={styles.icon}
                    onClick={() => handleModalOpen("club", club)}
                  />
                  <FaTrash
                    className={styles.icon}
                    onClick={() => handleDelete(club.id, "club")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {currentItem.type === "category" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = { name: e.target.name.value };
                  handleFormSubmit(data, "category");
                }}
              >
                <h2 className={styles.ourtitle}>
                  {currentItem.data
                    ? "Tahrirlash Toifa"
                    : "Yangi Toifa qo'shish"}
                </h2>
                <label>Nomi:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentItem.data?.name || ""}
                  required
                />
                <button className={styles.addordelete} type="submit">
                  {currentItem.data ? "Saqlash" : "Qo'shish"}
                </button>
              </form>
            )}

            {currentItem.type === "field" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = { name: e.target.name.value };
                  handleFormSubmit(data, "field");
                }}
              >
                <h2 className={styles.ourtitle}>
                  {currentItem.data
                    ? "Tahrirlash Maydon"
                    : "Yangi Maydon qo'shish"}
                </h2>
                <label>Nomi:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentItem.data?.name || ""}
                  required
                />
                <button className={styles.addordelete} type="submit">
                  {currentItem.data ? "Saqlash" : "Qo'shish"}
                </button>
              </form>
            )}

            {currentItem.type === "club" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = {
                    title: e.target.title.value,
                    goal: e.target.goal.value,
                    tutor: e.target.tutor.value,
                    category: parseInt(e.target.category.value),
                    fields: Array.from(
                      e.target.fields.selectedOptions,
                      (option) => parseInt(option.value)
                    ),
                  };
                  handleFormSubmit(data, "club");
                }}
              >
                <h2 className={styles.ourtitle}>
                  {currentItem.data ? "Tahrirlash Klub" : "Yangi Klub qo'shish"}
                </h2>
                <label>Nomi:</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentItem.data?.title || ""}
                  required
                />

                <label>Maqsad:</label>
                <input
                  type="text"
                  name="goal"
                  defaultValue={currentItem.data?.goal || ""}
                  required
                />

                <label>O'qituvchi:</label>
                <input
                  type="text"
                  name="tutor"
                  defaultValue={currentItem.data?.tutor || ""}
                  required
                />

                <label>Kategoriya:  (Har bir klub uchun faqat bitta)</label>
                <select
                  name="category"
                  defaultValue={currentItem.data?.category || ""}
                  required
                >
                  <option value="">-- Tanlang --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label>Maydonlar:</label>
                <select
                  name="fields"
                  multiple
                  defaultValue={currentItem.data?.fields || []}
                >
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>

                <button className={styles.addordelete} type="submit">
                  {currentItem.data ? "Saqlash" : "Qo'shish"}
                </button>
              </form>
            )}

            <button className={styles.closeModal} onClick={handleModalClose}>
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Union;
