import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import styles from "./PageCreate.module.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageCreate = () => {
  const [dropdowns, setDropdowns] = useState([]);
  const [menus, setMenus] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch dropdowns
  useEffect(() => {
    axios
      .get("https://sayt.renessans-edu.uz/api/pagecreate/dropdowns/")
      .then((response) => setDropdowns(response.data))
      .catch((error) => console.error("Error fetching dropdowns:", error));

    // Fetch menus
    axios
      .get("https://sayt.renessans-edu.uz/api/pagecreate/menus/")
      .then((response) => setMenus(response.data))
      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  // Open Modal
  const openModal = (data = null) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Ushbu elementni o'chirishni istaysizmi?")) {
      axios
        .delete(`https://sayt.renessans-edu.uz/api/pagecreate/dropdowns/${id}/`)
        .then(() => {
          setDropdowns((prev) => prev.filter((item) => item.id !== id));
          toast.success("Element muvaffaqiyatli o'chirildi!");
        })
        .catch((error) => console.error("Error deleting dropdown:", error));
    }
  };

  // Handle Save (Add or Edit)
  const handleSave = (data) => {
    const apiUrl = modalData
      ? `https://sayt.renessans-edu.uz/api/pagecreate/dropdowns/${modalData.id}/`
      : "https://sayt.renessans-edu.uz/api/pagecreate/dropdowns/";

    const method = modalData ? "put" : "post";

    axios[method](apiUrl, data)
      .then((response) => {
        if (modalData) {
          setDropdowns((prev) =>
            prev.map((item) =>
              item.id === modalData.id ? response.data : item
            )
          );
        } else {
          setDropdowns((prev) => [...prev, response.data]);
        }
        closeModal();
        toast.success("Element muvaffaqiyatli saqlandi!");
      })
      .catch((error) => console.error("Error saving dropdown:", error));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mavjud sahifalarni boshqarish</h1>
        <button className={styles.addButton} onClick={() => openModal()}>
          <FaPlus /> Yangi qo'shish
        </button>
      </header>
      <div className={styles.dropdownList}>
        {dropdowns.map((dropdown) => (
          <div key={dropdown.id} className={styles.dropdownCard}>
            <h3>{dropdown.site_title}</h3>
            <p>
              <strong>Menu:</strong> {dropdown.menu}
            </p>
            {/* <div
              className={styles.dropdownDetails}
              dangerouslySetInnerHTML={{ __html: dropdown.site_details }}
            /> */}
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => openModal(dropdown)}
              >
                <FaEdit /> Tahrirlash
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(dropdown.id)}
              >
                <FaTrashAlt /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          data={modalData}
          menus={menus}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      <ToastContainer />
    </div>
  );
};

// Modal Component with Enhanced Design
const Modal = ({ data, menus, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    menu: data?.menu || "",
    site_title: data?.site_title || "",
    site_details: data?.site_details || "",
    slug: data?.slug || "", // Add slug field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, site_details: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseCircleLine />
        </button>
        <h2 className={styles.modalTitle}>
          {data ? "Sahifalarni tahrirlash" : "Yangi sahifa qo'shish"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Menu</label>
            <select
              name="menu"
              value={formData.menu}
              onChange={handleChange}
              required
              className={styles.selectInput}
            >
              <option value="" disabled>
                Menu tanlang
              </option>
              {menus.map((menu) => (
                <option key={menu.id} value={menu.name}>
                  {menu.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Sahifa nomi</label>
            <input
              type="text"
              name="site_title"
              value={formData.site_title}
              onChange={handleChange}
              required
              className={styles.textInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Batafsil</label>
            <ReactQuill
              theme="snow"
              value={formData.site_details}
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: ["small", "medium", "large", "huge"] }], // Font size
                  [{ align: [] }], // Text alignment
                  [{ list: "ordered" }, { list: "bullet" }], // Lists
                  ["bold", "italic", "underline", "strike"], // Basic text formatting
                  [{ color: [] }, { background: [] }],
                  ["link", "image", "video"], 
                  ["blockquote"], 
                  ["hr"], 
                  ["undo", "redo"], 
                  ["code-block"],
                  ["table"],
                ],
              }}
              className={styles.quillEditor}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className={styles.textInput}
            />
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveButton}>
              <IoIosSave /> Saqlash
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageCreate;
