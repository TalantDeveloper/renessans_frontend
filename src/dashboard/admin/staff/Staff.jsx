import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import {
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styles from "./Staff.module.css";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    occupation: "",
    phone: "",
    email: "",
    about_work: "",
    tasks: "",
    image: null,
  });

  const apiUrl = "https://sayt.renessans-edu.uz/api/staff/";

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStaffList(response.data);
    } catch (error) {
      console.error("Error loading staff:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Hodimni o'chirishni tasdiqlaysizmi?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiUrl}${id}/`);
      setStaffList((prev) => prev.filter((staff) => staff.id !== id));
      alert("Hodim muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Hodimni o'chirishda xatolik yuz berdi.");
    }
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("full_name", formData.full_name);
      payload.append("occupation", formData.occupation);
      payload.append("phone", formData.phone);
      payload.append("email", formData.email);
      payload.append("about_work", formData.about_work);
      payload.append("tasks", formData.tasks);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (currentStaff) {
        const response = await axios.put(
          `${apiUrl}${currentStaff.id}/`,
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setStaffList((prev) =>
          prev.map((staff) =>
            staff.id === currentStaff.id ? response.data : staff
          )
        );
      } else {
        const response = await axios.post(apiUrl, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStaffList((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  const openModal = (staff = null) => {
    setCurrentStaff(staff);
    setFormData(
      staff
        ? {
            full_name: staff.full_name,
            occupation: staff.occupation,
            phone: staff.phone,
            email: staff.email,
            about_work: staff.about_work,
            tasks: staff.tasks,
            image: null,
          }
        : {
            full_name: "",
            occupation: "",
            phone: "",
            email: "",
            about_work: "",
            tasks: "",
            image: null,
          }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStaff(null);
    setFormData({
      full_name: "",
      occupation: "",
      phone: "",
      email: "",
      about_work: "",
      tasks: "",
      image: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FaUserTie className={styles.icon} /> Bizning rahbariyat
        </h1>
        <button className={styles.addButton} onClick={() => openModal()}>
          + Rahbar qo'shish
        </button>
      </div>

      <div className={styles.staffList}>
        {staffList.map((staff) => (
          <div key={staff.id} className={styles.staffCard}>
            <div className={styles.cardHeader}>
              {staff.image ? (
                <img
                  src={staff.image}
                  alt={staff.full_name}
                  className={styles.staffImage}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <FaUserTie />
                </div>
              )}
              <h3>{staff.full_name}</h3>
            </div>
            <p>
              <FaPhoneAlt className={styles.icon} /> {staff.phone}
            </p>
            <p>
              <FaEnvelope className={styles.icon} /> {staff.email}
            </p>
            {/* <p>
              <strong>Mehnat faoliyati:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: staff.about_work }}
              ></span>
            </p> */}
            {/* <p>
              <strong>Vazifalari:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: staff.tasks }}></span>
            </p> */}
            <div className={styles.actions}>
              <button
                onClick={() => openModal(staff)}
                className={styles.editButton}
              >
                <FaEdit /> Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(staff.id)}
                className={styles.deleteButton}
              >
                <FaTrash /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{currentStaff ? "Edit Staff" : "Add New Staff"}</h2>
            <form>
              <label>To'liq ism:</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
              <label>Lavozimi:</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              />
              <label>Telefon raqami:</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <label>Elektron pochta:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label>Mehnat faoliyati:</label>
              <ReactQuill
                theme="snow"
                value={formData.about_work}
                onChange={(value) =>
                  setFormData({ ...formData, about_work: value })
                }
              />
              <label>Vazifalari:</label>
              <ReactQuill
                theme="snow"
                value={formData.tasks}
                onChange={(value) => setFormData({ ...formData, tasks: value })}
              />
              <label>Rasm:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={handleSave}
                  className={styles.saveButton}
                >
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

export default Staff;
