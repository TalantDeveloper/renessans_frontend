import React from "react";
import {
  FaBook,
  FaUniversity,
  FaMicroscope,
  FaGavel,
  FaUserGraduate,
} from "react-icons/fa";
import styles from "./Hackathon.module.css";
import { useNavigate } from "react-router-dom";

const Hackathon = () => {
  const navigate = useNavigate();

  const aboutData = [
    {
      id: 1,
      icon: <FaBook />,
      title: "Sifatli Ta'lim",
      description:
        "Biz talabalarimizga yuqori sifatli ta'lim berishni maqsad qilganmiz.",
    },
    {
      id: 2,
      icon: <FaUniversity />,
      title: "Universitet Ma'lumotlari",
      description: "Universitet haqida asosiy ma'lumotlar va resurslar.",
    },
    {
      id: 3,
      icon: <FaMicroscope />,
      title: "Ilmiy Tadqiqotlar",
      description:
        "Tadqiqot imkoniyatlari orqali talabalarni ilmga rag‘batlantirish.",
    },
    {
      id: 4,
      icon: <FaGavel />,
      title: "Qonun va Huquq",
      description:
        "Huquq va adolat tamoyillari asosida ta'lim va imkoniyatlar.",
    },
    {
      id: 5,
      icon: <FaUserGraduate />,
      title: "Talaba Hayoti",
      description: "Talabalar uchun turli tadbirlar va imkoniyatlar.",
    },
    {
      id: 6,
      icon: <FaBook />,
      title: "Maxsus grantlar",
      description:
        "Universitet tomonidan talabalar uchun turli grantlar ajratiladi.",
    },
  ];

  return (
    <div className={styles.allInContainer}>
      {/* Decorative Icons */}
      <FaBook className={`${styles.iconDecor} ${styles.iconDecor1}`} />
      <FaUniversity className={`${styles.iconDecor} ${styles.iconDecor2}`} />
      <FaMicroscope className={`${styles.iconDecor} ${styles.iconDecor3}`} />
      <FaGavel className={`${styles.iconDecor} ${styles.iconDecor4}`} />
      <FaUserGraduate className={`${styles.iconDecor} ${styles.iconDecor5}`} />
      <FaGavel className={`${styles.iconDecor} ${styles.iconDecor7}`} />
      <FaUserGraduate className={`${styles.iconDecor} ${styles.iconDecor8}`} />

      {/* Main Content */}
      <div className={styles.container}>
        <h2 className={styles.title}>Biz haqimizda</h2>
        <p className={styles.subtitle}>
          Renessans ta'lim universiteti - yuqori sifatli ta'lim va zamonaviy
          tadqiqot imkoniyatlarini taklif etuvchi yetakchi oliy o'quv yurtidir.
        </p>
        <div className={styles.aboutGrid}>
          {aboutData.map((item, index) => (
            <div
              data-aos={index % 1 === 0 ? "fade-right" : "fade-left"}
              key={item.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className={styles.iconContainer}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/about")}
          className={styles.moreButton}
        >
          Biz haqimizda ko'proq
        </button>
      </div>
    </div>
  );
};

export default Hackathon;
