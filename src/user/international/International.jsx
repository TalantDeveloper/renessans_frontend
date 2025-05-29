import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import classes from "./International.module.css";
import User from "./images.png";
import Action from "./istockphoto-1373264972-612x612.jpg";
import Action2 from "./how-to-start-coding-1.webp";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const cooperationData = [
  {
    id: 1,
    image: Action2,
    title:
      "“Bir makon, bir yo‘l” loyihasi doirasida Pekin bilan kelishuvga erishildi",
  },
  {
    id: 2,
    image: Action,
    title:
      "Sun’y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
  },
  {
    id: 3,
    image: Action2,
    title:
      "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum imzolandi",
  },
  {
    id: 4,
    image: Action,
    title:
      "“Bir makon, bir yo‘l” loyihasi doirasida Pekin bilan kelishuvga erishildi",
  },
  {
    id: 5,
    image: Action,
    title:
      "Sun’y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
  },
  {
    id: 6,
    image: Action2,
    title:
      "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum imzolandi",
  },
  {
    id: 7,
    image: Action,
    title:
      "“Bir makon, bir yo‘l” loyihasi doirasida Pekin bilan kelishuvga erishildi",
  },
  {
    id: 8,
    image: Action2,
    title:
      "Sun’y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
  },
];

const professorsData = [
  {
    id: 1,
    name: "Xuan Chang Mao",
    email: "changmao.mao@renessans-edu.uz",
    image: User,
    pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
  },
  {
    id: 2,
    name: "Liu Li",
    email: "Liu@renessans-edu.uz",
    image: User,
    pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
  },
  {
    id: 3,
    name: "Liu Shicong",
    email: "shicong@renessans-edu.uz",
    image: User,
    pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
  },
  {
    id: 6,
    name: "Liu Li",
    email: "Liu@renessans-edu.uz",
    image: User,
    pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
  },
  {
    id: 7,
    name: "Liu Shicong",
    email: "shicong@renessans-edu.uz",
    image: User,
    pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
  },
];

const Xalqaro = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes["mainContainer"]}>
      <div data-aos="fade-up" className={classes["container"]}>
        <h1 className={classes["page-title"]}>
          Xalqaro
          </h1>
        <p className={classes["breadcrumb"]}>
          Bosh sahifa - Xalqaro
          </p>

        <div className={classes["gallery"]}>
          {cooperationData.map((item) => (
            <div key={item.id} className={classes["gallery-item"]}>
              <Link to={`/international-cooperation/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={classes["gallery-image"]}
                />
                <div className={classes["gallery-text"]}>{item.title}</div>
              </Link>
            </div>
          ))}
        </div>

        <h2 className={classes["professors-title"]}>
          {t("national_professor")}
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // Autoplay configuration
          spaceBetween={20}
          slidesPerView={4}
          className={classes["swiper-container"]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {professorsData.map((professor) => (
            <SwiperSlide key={professor.id}>
              <div className={classes["professor-card"]}>
                <img
                  src={professor.image}
                  alt={professor.name}
                  className={classes["professor-image"]}
                />
                <h3>{professor.name}</h3>
                <p>{professor.email}</p>
                <button className={classes["contact-button"]}>
                  <a
                    href={professor.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes["contact-button"]}
                  >
                    {t("about_employee")}
                    
                  </a>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={classes.sidebar}>
        <h3>{t("university")}</h3>
        <ul>
          <li onClick={() => navigate("/about")}>
            {t("about")}
            </li>
          <li onClick={() => navigate("/management")}>
            {t("management")}
            </li>
          <li onClick={() => navigate("/structure")}>
            {t("structure")}
            </li>
          <li
            className={classes.active}
            onClick={() => navigate("/international-cooperation")}
          >
            <span className={classes.icon}>▶</span>
            {t("internationalCooperation")}
          </li>
          <li onClick={() => navigate("/faculty-kafedra")}>
            {t("faculties")}
            </li>
          <li onClick={() => navigate("/anons")}>
            {t("events")}
            </li>
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

export default Xalqaro;
