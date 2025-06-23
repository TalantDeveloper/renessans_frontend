import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Autoplay } from "swiper/modules";
import classes from "./Activities.module.css";
// import Action from "./istockphoto-1373264972-612x612.jpg";
// import Action2 from "./how-to-start-coding-1.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { testUrl } from "../BaseData";
import Pagination from "@mui/material/Pagination";

// const cooperationData = [
//   {
//     id: 1,
//     image: Action2,
//     title:
//       "“Bir makon, bir yo‘l" loyihasi doirasida Pekin bilan kelishuvga erishildi",
//   },
//   {
//     id: 2,
//     image: Action,
//     title:
//       "Sun'y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
//   },
//   {
//     id: 3,
//     image: Action2,
//     title:
//       "Startap loyihalarni rivojlantirish bo'yicha Xitoy bilan memorandum imzolandi",
//   },
//   {
//     id: 4,
//     image: Action,
//     title:
//       "“Bir makon, bir yo'l" loyihasi doirasida Pekin bilan kelishuvga erishildi",
//   },
//   {
//     id: 5,
//     image: Action,
//     title:
//       "Sun'y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
//   },
//   {
//     id: 6,
//     image: Action2,
//     title:
//       "Startap loyihalarni rivojlantirish bo'yicha Xitoy bilan memorandum imzolandi",
//   },
//   {
//     id: 7,
//     image: Action,
//     title:
//       "“Bir makon, bir yo'l" loyihasi doirasida Pekin bilan kelishuvga erishildi",
//   },
//   {
//     id: 8,
//     image: Action2,
//     title:
//       "Sun'y intellektni rivojlantirish bo'yicha Tayvan bilan kelishuvga erishildi",
//   },
// ];

// const professorsData = [
//   {
//     id: 1,
//     name: "Xuan Chang Mao",
//     email: "changmao.mao@renessans-edu.uz",
//     image: User,
//     pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
//   },
//   {
//     id: 2,
//     name: "Liu Li",
//     email: "Liu@renessans-edu.uz",
//     image: User,
//     pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
//   },
//   {
//     id: 3,
//     name: "Liu Shicong",
//     email: "shicong@renessans-edu.uz",
//     image: User,
//     pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
//   },
//   {
//     id: 6,
//     name: "Liu Li",
//     email: "Liu@renessans-edu.uz",
//     image: User,
//     pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
//   },
//   {
//     id: 7,
//     name: "Liu Shicong",
//     email: "shicong@renessans-edu.uz",
//     image: User,
//     pdf: "/video/2024-03-26-18-07-40_e61e2fded8fb58c5e9f5b44017772fb2.pdf",
//   },
// ];

const Activities = () => {
  const {short_name} = useParams();
  const { t, i18n } = useTranslation();
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activitiesCategory, setActivitiesCategory] = useState()
  const currentLang = i18n.language;
  const [pageApi, setPageApi] = useState(1);
  const itemsPerPage = 9;
  const [activitiesCategories, setActivitiesCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(testUrl + "/api/activities/" + short_name)
      .then((response) => {
        setActivitiesData(response.data || []);
      })
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, [short_name, currentLang]);

  useEffect(() => {
    axios.get(testUrl + "/api/activitiestype/")
      .then((response) => {
        setActivitiesCategories(response.data || []);
      })
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik"));
  }, [currentLang]);

  // Pagination logic
  const indexOfLastItem = pageApi * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activitiesData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={classes["mainContainer"]}>
      <div data-aos="fade-up" className={classes["container"]}>
        <h1 className={classes["page-title"]}>{t("Ilmiy maktablar faoliyati")}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className={classes["gallery"]}>
              {currentActivities.map((item) => (
                <div
                  key={item.id}
                  className={classes["gallery-item"]}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/activity/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item[`name_${currentLang}`] || ''}
                    className={classes["gallery-image"]}
                  />
                  <div className={classes["gallery-text"]}>{item[`name_${currentLang}`]}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
              <Pagination
                onChange={(e, value) => setPageApi(value)}
                count={Math.ceil(activitiesData.length / itemsPerPage)}
                page={pageApi}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.sidebar}>
        <h3>{t("university")}</h3>
        <ul>
          {activitiesCategories.map((cat) => (
            <li
              key={cat.id}
              className={cat.short_name === short_name ? classes.active : ''}
              onClick={() => navigate(`/activity/${cat.id}`)}
            >
              {cat[`name_${currentLang}`]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Activities;
