import React, { useState } from "react";
import classes from "./Faculty.module.css";
import Course from "./faculty-banner.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import About from "./comp/About";

const facultyData = {
  mathematics: {
    name: "Pedagogika",
    courses: [
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Matematik tahlil va statistika",
        dayPrice: "18,000,000 so‘m",
        eveningPrice: "16,000,000 so‘m",
        distancePrice: "14,000,000 so‘m",
      },
    ],
  },
  informatics: {
    name: "Filologiya va tarix",
    courses: [
      {
        name: "Informatika va axborot texnologiyalari",
        dayPrice: "18,000,000 so‘m",
        eveningPrice: "16,000,000 so‘m",
        distancePrice: "14,000,000 so‘m",
      },
      {
        name: "Dasturiy ta‘minot ishlab chiqish",
        dayPrice: "19,500,000 so‘m",
        eveningPrice: "17,000,000 so‘m",
        distancePrice: "15,000,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
    ],
  },
  english: {
    name: "Matematika va iqtisodiyot",
    courses: [
      {
        name: "Ingliz tili va adabiyoti",
        dayPrice: "17,500,000 so‘m",
        eveningPrice: "15,500,000 so‘m",
        distancePrice: "13,500,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Matematika va amaliy matematika",
        dayPrice: "17,000,000 so‘m",
        eveningPrice: "15,000,000 so‘m",
        distancePrice: "13,000,000 so‘m",
      },
      {
        name: "Chet tili o‘qituvchisi",
        dayPrice: "16,500,000 so‘m",
        eveningPrice: "14,000,000 so‘m",
        distancePrice: "12,000,000 so‘m",
      },
    ],
  },
};

const Faculties = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { t, i18n } = useTranslation();

  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedCourse(null);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  // Function to show toast and close modal
  const handleApplyClick = () => {
    toast.success("Successfully!", {
      position: "top-right",
      autoClose: 3000, // Close automatically after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Close the modal after the toast appears
    setSelectedCourse(null);
  };

  const resetFacultySelection = () => {
    setSelectedFaculty(null);
    setSelectedCourse(null);
  };

  const navigate = useNavigate();

  return (
    <div className={classes["mainContainer"]}>
      <div data-aos="fade-up" className={classes["layercontainer"]}>
        <div className={classes["container"]}>
          <h1 className={classes["page-title"]}>Fakultetlar</h1>
          {!selectedFaculty && (
            // <div className={classes["faculty-options"]}>
            //   <button onClick={() => handleFacultyClick("mathematics")}>
            //     Pedagogika
            //   </button>
            //   <button onClick={() => handleFacultyClick("informatics")}>
            //     Filologiya va tarix
            //   </button>
            //   <button onClick={() => handleFacultyClick("english")}>
            //     Matematika va iqtisodiyot
            //   </button>
            // </div>
            <div className={classes["allCards"]}>
              <div className={classes["card"]}>
                <div className={classes["image"]}></div>
                <div className={classes["card-info"]}>
                  <span>Matematika va iqtisod</span>
                  <p>Matematik va iqtisodiy bilimlar</p>
                </div>
                <a
                  onClick={() => handleFacultyClick("english")}
                  className={classes["button"]}
                >
                  Ko'rish
                </a>
              </div>
              <div className={classes["card"]}>
                <div className={classes["image"]}></div>
                <div className={classes["card-info"]}>
                  <span>Filologiya va tarix</span>
                  <p>Tarixiy ma'lumotlar</p>
                </div>
                <a
                  className={classes["button"]}
                  onClick={() => handleFacultyClick("informatics")}
                >
                  Ko'rish
                </a>
              </div>
              <div className={classes["card"]}>
                <div className={classes["image"]}></div>
                <div className={classes["card-info"]}>
                  <span>Pedogogika</span>
                  <p>Pedodogik bilimlar manbai</p>
                </div>
                <a
                  className={classes["button"]}
                  onClick={() => handleFacultyClick("mathematics")}
                >
                  Ko'rish
                </a>
              </div>
            </div>
          )}

          <div>
            {selectedFaculty && <About />}

            {selectedFaculty && (
              <div>
                <h2 className={classes["current-faculty"]}>
                  {facultyData[selectedFaculty].name} fakulteti
                </h2>
                <button
                  onClick={resetFacultySelection}
                  className={classes["reset-button"]}
                >
                  Boshqa fakultetlarni ko‘rish
                </button>
              </div>
            )}

            <div className={classes["courses-container"]}>
              {selectedFaculty &&
                facultyData[selectedFaculty].courses.map((course, index) => (
                  <div>
                    <div
                      key={index}
                      className={classes["course-card"]}
                      onClick={() => handleCourseClick(course)} // Open modal on click
                    >
                      <div className={classes["course-icon"]}>
                        <img src={Course} alt="course icon" />
                      </div>
                      <h2 className={classes["course-title"]}>{course.name}</h2>
                      <p>
                        To‘lov miqdori (kunduzgi shakl):{" "}
                        <strong>{course.dayPrice}</strong>
                      </p>
                      <p>
                        To‘lov miqdori (kechki shakl):{" "}
                        <strong>{course.eveningPrice}</strong>
                      </p>
                      <p>
                        To‘lov miqdori (sirtqi shakl):{" "}
                        <strong>{course.distancePrice}</strong>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {selectedCourse && (
            <div className={classes["modal-overlay"]}>
              <div className={classes["modal-content"]}>
                <button onClick={closeModal} className={classes["modal-close"]}>
                  &times;
                </button>
                <h2>{selectedCourse.name}</h2>
                <p>
                  To‘lov miqdori (kunduzgi shakl):{" "}
                  <strong>{selectedCourse.dayPrice}</strong>
                </p>
                <p>
                  To‘lov miqdori (kechki shakl):{" "}
                  <strong>{selectedCourse.eveningPrice}</strong>
                </p>
                <p>
                  To‘lov miqdori (sirtqi shakl):{" "}
                  <strong>{selectedCourse.distancePrice}</strong>
                </p>
                <button
                  onClick={handleApplyClick} // Show toast and close modal
                  className={classes["apply-button"]}
                >
                  Ariza topshirish
                </button>
              </div>
            </div>
          )}

          {/* Add ToastContainer to display toasts */}
          <ToastContainer />
        </div>
      </div>
      <div className={classes.sidebar}>
        <h3>{t("university")}</h3>
        <ul>
          <li onClick={() => navigate("/about")}>{t("about")}</li>
          <li onClick={() => navigate("/management")}>{t("management")}</li>
          <li onClick={() => navigate("/structure")}>{t("structure")}</li>
          <li onClick={() => navigate("/international-cooperation")}>
            {t("internationalCooperation")}
          </li>
          <li className={classes.active} onClick={() => navigate("/faculty")}>
            <span className={classes.icon}>▶</span>
            {t("faculties")}
          </li>
          <li onClick={() => navigate("/anons")}>{t("events")}</li>
          <li
            onClick={() => navigate("/statistics")}
            className={classes.dropdownToggle}
          >
            {t("statistics")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Faculties;
