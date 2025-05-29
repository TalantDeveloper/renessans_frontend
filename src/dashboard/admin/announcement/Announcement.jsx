import React, { useState, useEffect, forwardRef } from "react";
import styles from "./Announcements.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// API URL
const API_URL = "https://sayt.renessans-edu.uz/api/announcement/";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    full_announcement: "",
    image: null,
    preview: null,
    is_main: false,
    holding_date: new Date(),
    finishing_time: new Date(),
  });

  const [modalType, setModalType] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Fetch announcements
  const fetchAnnouncements = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle date changes
  const handleDateChange = (date, name) => {
    setForm({
      ...form,
      [name]: date,
    });
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("full_announcement", form.full_announcement);
    if (form.image) {
      formData.append("image", form.image);
    }
    formData.append("is_main", form.is_main);
    formData.append("holding_date", moment(form.holding_date).toISOString());
    formData.append(
      "finishing_time",
      moment(form.finishing_time).toISOString()
    );

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_URL}${form.id}/` : API_URL;

    console.log("Submitting announcement:", {
      method,
      url,
      formData,
    });

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setForm({
        id: null,
        title: "",
        full_announcement: "",
        image: null,
        preview: null,
        is_main: false,
        holding_date: new Date(),
        finishing_time: new Date(),
      });
      fetchAnnouncements();
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error submitting announcement:", error);
      alert("Failed to submit announcement. Please try again.");
    }
  };

  // Handle edit
  const handleEdit = (announcement) => {
    setForm({
      ...announcement,
      image: null,
      preview: announcement.image,
      holding_date: new Date(announcement.holding_date),
      finishing_time: new Date(announcement.finishing_time),
    });
    setModalType("edit");
    setModalIsOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Ushbu e’lonni o‘chirishga ishonchingiz komilmi?")) {
      await fetch(`${API_URL}${id}/`, { method: "DELETE" });
      fetchAnnouncements();
    }
  };

  // Handle "See More" modal
  const handleSeeMore = (announcement) => {
    const sanitizedContent = announcement.full_announcement.replace(
      /<[^>]+>/g,
      ""
    ); // Remove all HTML tags
    setModalContent(sanitizedContent);
    setModalType("seeMore");
    setModalIsOpen(true);
  };

  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <input
      className={styles.datePickerInput}
      onClick={onClick}
      value={value}
      ref={ref}
      placeholder={placeholder}
      readOnly
    />
  ));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>E'lonlarni boshqarish</h1>

      <button
        onClick={() => {
          setModalType("add");
          setModalIsOpen(true);
        }}
        className={styles.addButton}
      >
        E'lon qo'shish
      </button>

      {/* Add/Edit Announcement Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel={
          modalType === "add" ? "Add Announcement" : "Edit Announcement"
        }
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <button
          onClick={() => setModalIsOpen(false)}
          className={styles.closeModalButton}
        >
          &times;
        </button>
        <div className={styles.modalContent}>
          <h2 className={styles.addordelete}>
            {modalType === "add"
              ? "Yangi e'lon qo'shish"
              : "E'lonni tahrirlash"}
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <label>Sarlavha:</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formRow}>
              <label>To'liq matn:</label>
              <ReactQuill
                theme="snow"
                value={form.full_announcement}
                onChange={(value) =>
                  setForm({ ...form, full_announcement: value })
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "+1" },
                      { indent: "-1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                  "align",
                ]}
              />
            </div>
            <div
              className={styles.fileUploadWrapper}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <span>Rasmni bu yerga sudrab olib keling yoki tanlang</span>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>
            {form.preview && (
              <div className={styles.imagePreview}>
                <img src={form.preview} alt="Ko'rinish" />
              </div>
            )}
            <div className={styles.formRow}>
              <label>Asosiymi:</label>
              <input
                type="checkbox"
                name="is_main"
                checked={form.is_main}
                onChange={handleChange}
              />
              <span className={styles.iconWrapper}>
                {form.is_main ? (
                  <AiOutlineCheckCircle className={styles.iconMain} />
                ) : (
                  <AiOutlineCloseCircle className={styles.iconNotMain} />
                )}
              </span>
            </div>
            <div className={styles.formRow}>
              <label>O'tkazish sanasi:</label>
              <DatePicker
                selected={form.holding_date}
                onChange={(date) => handleDateChange(date, "holding_date")}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <CustomInput placeholder="E'lon o'tkaziladigan sanani tanlang" />
                }
              />
            </div>
            <div className={styles.formRow}>
              <label>Tugash vaqti:</label>
              <DatePicker
                selected={form.finishing_time}
                onChange={(date) => handleDateChange(date, "finishing_time")}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <CustomInput placeholder="Tugash vaqtini tanlang" />
                }
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {form.id ? "Yangilash" : "Qo'shish"}
            </button>
          </form>
        </div>
      </Modal>

      <h2 className={styles.subtitle}>Mavjud e'lonlar</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sarlavha</th>
            <th>Matn</th>
            <th>Rasm</th>
            <th>Asosiy</th>
            <th>O'tkazish sanasi</th>
            <th>Tugash vaqti</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.title}</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      announcement.full_announcement.length > 100
                        ? `${announcement.full_announcement.substring(
                            0,
                            90
                          )}...`
                        : announcement.full_announcement,
                  }}
                />
                {announcement.full_announcement.length > 100 && (
                  <button
                    className={styles.seeMore}
                    onClick={() => handleSeeMore(announcement)}
                  >
                    ko'proq ko'rsatish
                  </button>
                )}
              </td>

              <td>
                <img
                  src={announcement.image}
                  className={styles.tableImage}
                  alt="E'lon rasmi"
                />
              </td>
              <td>
                {announcement.is_main ? (
                  <span className={styles.iconWrapper}>
                    Ha <AiOutlineCheckCircle className={styles.iconMain} />
                  </span>
                ) : (
                  <span className={styles.iconWrapper}>
                    Yo'q
                    <AiOutlineCloseCircle className={styles.iconNotMain} />
                  </span>
                )}
              </td>
              <td>
                {moment(announcement.holding_date).format("YYYY-MM-DD HH:mm")}
              </td>
              <td>
                {moment(announcement.finishing_time).format("YYYY-MM-DD HH:mm")}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(announcement)}
                  className={styles.editButton}
                >
                  <AiOutlineEdit /> Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className={styles.deleteButton}
                >
                  <AiOutlineDelete /> O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Full Announcement Modal */}
      <Modal
        isOpen={modalIsOpen && modalType === "seeMore"}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Full Announcement"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <button
          onClick={() => setModalIsOpen(false)}
          className={styles.closeModalButton}
        >
          &times;
        </button>
        <div className={styles.modalContent2}>
          <h2>To'liq e'lon</h2>
          <p>{modalContent}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Announcements;
