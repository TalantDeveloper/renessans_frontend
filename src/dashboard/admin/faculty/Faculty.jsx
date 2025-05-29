import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Faculty.module.css";

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [facultyFields, setFacultyFields] = useState([]);
  const [newFaculty, setNewFaculty] = useState("");
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [newField, setNewField] = useState({
    title: "",
    description: "",
    daytime_price: "",
    evening_price: "",
    part_time_price: "",
    faculty: "",
  });

  // Fetch faculties from the API
  const fetchFaculties = () => {
    axios
      .get("https://sayt.renessans-edu.uz/api/faculty/faculties/")
      .then((response) => setFaculties(response.data))
      .catch((error) => console.error("Error fetching faculties:", error));
  };

  // Fetch faculty fields from the API
  const fetchFacultyFields = () => {
    axios
      .get("https://sayt.renessans-edu.uz/api/faculty/faculty-fields/")
      .then((response) => setFacultyFields(response.data))
      .catch((error) => console.error("Error fetching faculty fields:", error));
  };

  // Fetch faculties and faculty fields on component mount
  useEffect(() => {
    fetchFaculties();
    fetchFacultyFields();
  }, []);

  // Add a new faculty
  const handleAddFaculty = () => {
    axios
      .post("https://sayt.renessans-edu.uz/api/faculty/faculties/", {
        name: newFaculty,
      })
      .then((response) => {
        setFaculties((prev) => [...prev, response.data]);
        setNewFaculty("");
        toast.success("Faculty added successfully!");
      })
      .catch((error) => {
        console.error("Error adding faculty:", error);
        toast.error("Error adding faculty.");
      });
  };

  // Edit faculty
  const handleEditFaculty = (id) => {
    axios
      .put(`https://sayt.renessans-edu.uz/api/faculty/faculties/${id}/`, {
        name: editingFaculty.name,
      })
      .then((response) => {
        setFaculties((prev) =>
          prev.map((f) => (f.id === id ? response.data : f))
        );
        setEditingFaculty(null);
        toast.success("Faculty updated successfully!");
      })
      .catch((error) => {
        console.error("Error editing faculty:", error);
        toast.error("Error updating faculty.");
      });
  };

  // Delete faculty
  // Delete faculty with confirmation
  const handleDeleteFaculty = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this faculty?"
    );
    if (!isConfirmed) return;

    axios
      .delete(`https://sayt.renessans-edu.uz/api/faculty/faculties/${id}/`)
      .then(() => {
        setFaculties((prev) => prev.filter((f) => f.id !== id));
        toast.success("Faculty deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting faculty:", error);
        toast.error("Error deleting faculty.");
      });
  };

  // Add a new faculty field
  const handleAddField = () => {
    axios
      .post(
        "https://sayt.renessans-edu.uz/api/faculty/faculty-fields/",
        newField
      )
      .then((response) => {
        setFacultyFields((prev) => [...prev, response.data]);
        setNewField({
          title: "",
          description: "",
          daytime_price: "",
          evening_price: "",
          part_time_price: "",
          faculty: "",
        });
        toast.success("Field added successfully!");
      })
      .catch((error) => {
        console.error("Error adding field:", error);
        toast.error("Error adding field.");
      });
  };

  // Edit a faculty field
  const handleEditField = (id) => {
    axios
      .put(
        `https://sayt.renessans-edu.uz/api/faculty/faculty-fields/${id}/`,
        editingField
      )
      .then((response) => {
        setFacultyFields((prev) =>
          prev.map((f) => (f.id === id ? response.data : f))
        );
        setEditingField(null);
        toast.success("Field updated successfully!");
      })
      .catch((error) => {
        console.error("Error editing field:", error);
        toast.error("Error updating field.");
      });
  };

  // Delete a faculty field
  const handleDeleteField = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this field?"
    );
    if (!isConfirmed) return;

    axios
      .delete(`https://sayt.renessans-edu.uz/api/faculty/faculty-fields/${id}/`)
      .then(() => {
        setFacultyFields((prev) => prev.filter((f) => f.id !== id));
        toast.success("Field deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting field:", error);
        toast.error("Error deleting field.");
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fakultetlar</h1>

      <ToastContainer />

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Sohalar</h2>
        <div className={styles.list}>
          {faculties.map((faculty) => (
            <div key={faculty.id} className={styles.card}>
              {editingFaculty?.id === faculty.id ? (
                <input
                  className={styles.input}
                  value={editingFaculty.name}
                  onChange={(e) =>
                    setEditingFaculty({
                      ...editingFaculty,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                <span className={styles.name}>{faculty.name}</span>
              )}
              <div className={styles.actions}>
                {editingFaculty?.id === faculty.id ? (
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleEditFaculty(faculty.id)}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className={styles.iconBtn}
                    onClick={() => setEditingFaculty(faculty)}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className={styles.iconBtn}
                  onClick={() => handleDeleteFaculty(faculty.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.addForm}>
          <input
            className={styles.input}
            type="text"
            value={newFaculty}
            onChange={(e) => setNewFaculty(e.target.value)}
            placeholder="Add new faculty"
          />
          <button className={styles.addBtn} onClick={handleAddFaculty}>
            <FaPlus /> Soha qo'shish
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Fakultetlar</h2>
        <div className={styles.list}>
          {facultyFields.map((field) => (
            <div key={field.id} className={styles.card}>
              {editingField?.id === field.id ? (
                <>
                  <input
                    className={styles.input}
                    type="text"
                    value={editingField.title}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        title: e.target.value,
                      })
                    }
                    placeholder="Edit title"
                  />
                  <input
                    className={styles.input}
                    type="text"
                    value={editingField.description}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        description: e.target.value,
                      })
                    }
                    placeholder="Edit description"
                  />
                  <input
                    className={styles.input}
                    type="text"
                    value={editingField.daytime_price}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        daytime_price: e.target.value,
                      })
                    }
                    placeholder="Edit daytime price"
                  />
                  <input
                    className={styles.input}
                    type="text"
                    value={editingField.evening_price}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        evening_price: e.target.value,
                      })
                    }
                    placeholder="Edit evening price"
                  />
                  <input
                    className={styles.input}
                    type="text"
                    value={editingField.part_time_price}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        part_time_price: e.target.value,
                      })
                    }
                    placeholder="Edit part-time price"
                  />
                  <select
                    className={styles.input}
                    value={editingField.faculty}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        faculty: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <span className={styles.name}>Sarlavha: {field.title}</span>
                  <span className={styles.description}>
                    Description: {field.description}
                  </span>
                  <span className={styles.price}>
                    Kunduzgi: {field.daytime_price}
                  </span>
                  <span className={styles.price}>
                    Kechgi: {field.evening_price}
                  </span>
                  <span className={styles.price}>
                    Sirtqi: {field.part_time_price}
                  </span>
                  <span className={styles.faculty}>
                    Soha:{" "}
                    {faculties.find((f) => f.id === field.faculty)?.name ||
                      "N/A"}
                  </span>
                </>
              )}
              <div className={styles.actions}>
                {editingField?.id === field.id ? (
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleEditField(field.id)}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className={styles.iconBtn}
                    onClick={() => setEditingField({ ...field })}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className={styles.iconBtn}
                  onClick={() => handleDeleteField(field.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <h1 className={styles.add_faculty}>Fakultet qo'shish</h1>
        <div className={styles.addForm}>
          <input
            className={styles.input}
            type="text"
            value={newField.title}
            onChange={(e) =>
              setNewField({ ...newField, title: e.target.value })
            }
            placeholder="Sarlavha"
          />
          <input
            className={styles.input}
            type="text"
            value={newField.description}
            onChange={(e) =>
              setNewField({ ...newField, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            className={styles.input}
            type="text"
            value={newField.daytime_price}
            onChange={(e) =>
              setNewField({ ...newField, daytime_price: e.target.value })
            }
            placeholder="Kunduzgi narxi"
          />
          <input
            className={styles.input}
            type="text"
            value={newField.evening_price}
            onChange={(e) =>
              setNewField({ ...newField, evening_price: e.target.value })
            }
            placeholder="Kechgi narxi"
          />
          <input
            className={styles.input}
            type="text"
            value={newField.part_time_price}
            onChange={(e) =>
              setNewField({ ...newField, part_time_price: e.target.value })
            }
            placeholder="Sirtqi narxi"
          />
          <select
            className={styles.input}
            value={newField.faculty}
            onChange={(e) =>
              setNewField({ ...newField, faculty: e.target.value })
            }
          >
            <option value="">Sohani tanlash</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>
          <button className={styles.addBtn} onClick={handleAddField}>
            <FaPlus /> Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
