import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaCalculator,
  FaUniversity,
} from "react-icons/fa";
import styles from "./FakultetCourse.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const [faculties, setFaculties] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", family: "", phone: "" });
  const { t } = useTranslation(); // For translations
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("uz-UZ");
    return `${formatter.format(parseInt(price) * 1000000)} so'm`;
  };

  const facultyIcons = {
    "Pedagogika fakulteti": FaBook,
    "Filologiya va tarix fakulteti": FaChalkboardTeacher,
    "Matematika va iqtisodiyot fakulteti": FaCalculator,
  };

  useEffect(() => {
    fetch("https://sayt.renessans-edu.uz/api/faculty/faculties/")
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleApplicationClick = () => {
    setShowModal(true); // Show modal on button click
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setShowModal(false); // Close modal on submit
    setShowToast(true); // Show toast notification
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    setFormData({ name: "", family: "", phone: "" }); // Reset form
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.content}>
        {faculties.map((faculty) => {
          const facultyName = faculty[`name_${t("language")}`]; // Get faculty name based on the current language
          if (!facultyName) {
            console.error(
              "Faculty name not found for language:",
              t("language")
            );
            return null; // Skip rendering this faculty if no name is found
          }

          const IconComponent = facultyIcons[facultyName] || FaUniversity; // Default icon if not found

          return (
            <React.Fragment key={faculty.id}>
              <h1 id={facultyName.toLowerCase()}>{facultyName}</h1>
              <section className={styles.cardsSection}>
                {faculty.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`${styles.card} ${
                      styles[`cardColor${index % 5}`]
                    }`}
                  >
                    <div className={styles.cardHeader}>
                      <IconComponent size={40} color="#555" />
                      <div>
                        <h3>{field[`title_${t("language")}`]}</h3>{" "}
                        {/* Dynamic title based on language */}
                        <p>{field[`description_${t("language")}`]}</p>{" "}
                        {/* Dynamic description based on language */}
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div>
                        <span>{t("Kunduzgi")}</span>
                        <span>{formatPrice(field.daytime_price)}</span>
                      </div>
                      <div>
                        <span>{t("Kechki")}</span>
                        <span>{formatPrice(field.evening_price)}</span>
                      </div>
                      <div>
                        <span>{t("Sirtqi")}</span>
                        <span>{formatPrice(field.part_time_price)}</span>
                      </div>
                    </div>
                    <a
                      className={styles.applyButton}
                      href="https://renessans-edu.uz/uz/cv"
                      target="blank"
                    >
                      {t("Ariza qoldiring")}
                    </a>
                  </div>
                ))}
              </section>
            </React.Fragment>
          );
        })}
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3>{t("faculties")}</h3>
        <ul>
          {faculties.map((faculty) => {
            const facultyName = faculty[`name_${t("language")}`];
            if (!facultyName) {
              return null; // Skip rendering faculty if no name is found
            }

            const sectionId = facultyName.toLowerCase();
            return (
              <li
                key={faculty.id}
                onClick={() => scrollToSection(sectionId)}
                className={activeSection === sectionId ? styles.active : ""}
              >
                {facultyName}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Toast Notification */}
      {showToast && <div className={styles.toast}>{t("application_sent")}</div>}

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{t("leave_application")}</h2>
            <label>
              {t("name")}:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              {t("family_name")}:
              <input
                type="text"
                name="family"
                value={formData.family}
                onChange={handleInputChange}
              />
            </label>
            <label>
              {t("phone_number")}:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <button className={styles.submitButton} onClick={handleSubmit}>
              {t("submit")}
            </button>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
