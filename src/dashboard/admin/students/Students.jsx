import React, { useState, useEffect } from "react";
import styles from "./Students.module.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const Students = () => {
  const [excellentStudents, setExcellentStudents] = useState([]);
  const [championStudents, setChampionStudents] = useState([]);
  const [scholarshipHolders, setScholarshipHolders] = useState([]);
  const [editing, setEditing] = useState({
    id: null,
    name: "",
    surname: "",
    description: "",
    image: null,
    preview: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState("excellent");

  useEffect(() => {
    fetch("https://sayt.renessans-edu.uz/api/students/excellent-students/")
      .then((response) => response.json())
      .then((data) => setExcellentStudents(data));

    fetch("https://sayt.renessans-edu.uz/api/students/champion-students/")
      .then((response) => response.json())
      .then((data) => setChampionStudents(data));

    fetch("https://sayt.renessans-edu.uz/api/students/scholarship-holders/")
      .then((response) => response.json())
      .then((data) => setScholarshipHolders(data));
  }, []);

  const handleDelete = async (id, type) => {
    const confirmed = window.confirm(
      "Bu o'quvchini o'chirishga ishonchingiz komilmi?"
    );
    if (!confirmed) return;

    const apiUrl =
      type === "excellent"
        ? "https://sayt.renessans-edu.uz/api/students/excellent-students/"
        : type === "champion"
        ? "https://sayt.renessans-edu.uz/api/students/champion-students/"
        : "https://sayt.renessans-edu.uz/api/students/scholarship-holders/";

    try {
      const response = await fetch(`${apiUrl}${id}/`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("O'quvchini o'chirishda xatolik.");
      }

      if (type === "excellent") {
        setExcellentStudents(
          excellentStudents.filter((student) => student.id !== id)
        );
      } else if (type === "champion") {
        setChampionStudents(
          championStudents.filter((student) => student.id !== id)
        );
      } else {
        setScholarshipHolders(
          scholarshipHolders.filter((student) => student.id !== id)
        );
      }
    } catch (error) {
      console.error("O'quvchini o'chirishda xatolik:", error);
      alert(
        "O'quvchini o'chirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
    }
  };

  const handleEdit = (student, type) => {
    setEditing({
      id: student.id,
      name: student.name,
      surname: student.surname,
      description: student.description,
      preview: student.image,
      image: null, // Reset the new image upload
    });
    setModalOpen(true);
    setCurrentType(type);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const apiUrl =
      currentType === "excellent"
        ? "https://sayt.renessans-edu.uz/api/students/excellent-students/"
        : currentType === "champion"
        ? "https://sayt.renessans-edu.uz/api/students/champion-students/"
        : "https://sayt.renessans-edu.uz/api/students/scholarship-holders/";

    const formData = new FormData();
    formData.append("name", editing.name);
    formData.append("surname", editing.surname);
    formData.append("description", editing.description);
    if (editing.image) formData.append("image", editing.image);

    try {
      const response = await fetch(`${apiUrl}${editing.id}/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("O'quvchini yangilashda xatolik.");
      }

      const data = await response.json();

      if (currentType === "excellent") {
        setExcellentStudents(
          excellentStudents.map((student) =>
            student.id === editing.id ? { ...student, ...data } : student
          )
        );
      } else if (currentType === "champion") {
        setChampionStudents(
          championStudents.map((student) =>
            student.id === editing.id ? { ...student, ...data } : student
          )
        );
      } else {
        setScholarshipHolders(
          scholarshipHolders.map((student) =>
            student.id === editing.id ? { ...student, ...data } : student
          )
        );
      }

      setEditing({
        id: null,
        name: "",
        surname: "",
        description: "",
        image: null,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("O'quvchini yangilashda xatolik:", error);
      alert(
        "O'quvchini yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const apiUrl =
      currentType === "excellent"
        ? "https://sayt.renessans-edu.uz/api/students/excellent-students/"
        : currentType === "champion"
        ? "https://sayt.renessans-edu.uz/api/students/champion-students/"
        : "https://sayt.renessans-edu.uz/api/students/scholarship-holders/";

    const formData = new FormData();
    formData.append("name", editing.name);
    formData.append("surname", editing.surname);
    formData.append("description", editing.description);
    if (editing.image) formData.append("image", editing.image);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("O'quvchini qo'shishda xatolik.");
      }

      const data = await response.json();

      if (currentType === "excellent") {
        setExcellentStudents([...excellentStudents, data]);
      } else if (currentType === "champion") {
        setChampionStudents([...championStudents, data]);
      } else {
        setScholarshipHolders([...scholarshipHolders, data]);
      }

      setEditing({
        id: null,
        name: "",
        surname: "",
        description: "",
        image: null,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("O'quvchini qo'shishda xatolik:", error);
      alert(
        "O'quvchini qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
    }
  };

  const handleInputChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditing({ ...editing, image: file, preview: URL.createObjectURL(file) });
  };

  const openAddModal = (type) => {
    setEditing({
      id: null,
      name: "",
      surname: "",
      description: "",
      image: null,
      preview: null,
    });
    setCurrentType(type);
    setModalOpen(true);
  };

  const renderStudentTable = (students, type) => (
    <div className={styles.studentListContainer}>
      <table className={styles.studentTable}>
        <thead>
          <tr>
            <th>Rasm</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Tavsif</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className={styles.studentRow}>
              <td>
                <img
                  src={student.image}
                  alt={`${student.name} ${student.surname}`}
                  className={styles.studentImage}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.description}</td>
              <td className={styles.studentActions}>
                <button
                  className={styles.iconButton}
                  onClick={() => handleEdit(student, type)}
                >
                  <FaEdit /> Tahrirlash
                </button>
                <button
                  className={styles.iconButton}
                  onClick={() => handleDelete(student.id, type)}
                >
                  <FaTrashAlt /> O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openAddModal(type)} className={styles.addButton}>
        <FaPlus />{" "}
        {type === "excellent"
          ? "A'lochi O'quvchini Qo'shish"
          : type === "champion"
          ? "Champion O'quvchini Qo'shish"
          : "Grant O'quvchini Qo'shish"}
      </button>
    </div>
  );

  return (
    <div className={styles.studentsContainer}>
      <h2 className={styles.heading}>A'lochi talabalar</h2>
      {renderStudentTable(excellentStudents, "excellent")}

      <h2 className={styles.heading}>Chempion talabalar</h2>
      {renderStudentTable(championStudents, "champion")}

      <h2 className={styles.heading}>Stipendiant talabalar</h2>
      {renderStudentTable(scholarshipHolders, "scholarship")}

      {modalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <form onSubmit={editing.id ? handleUpdate : handleAdd}>
              <div className={styles.form}>
                <input
                  type="text"
                  name="name"
                  className={styles.inputField}
                  value={editing.name}
                  onChange={handleInputChange}
                  placeholder="Ism"
                />
                <input
                  type="text"
                  name="surname"
                  className={styles.inputField}
                  value={editing.surname}
                  onChange={handleInputChange}
                  placeholder="Familiya"
                />
                <input
                  type="text"
                  name="description"
                  className={styles.inputField}
                  value={editing.description}
                  onChange={handleInputChange}
                  placeholder="Tavsif"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                {editing.preview && (
                  <img
                    src={editing.preview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                )}
                <button type="submit" className={styles.addButton}>
                  {editing.id ? "Yangilash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
