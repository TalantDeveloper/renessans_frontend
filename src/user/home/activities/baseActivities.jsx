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


const BaseActivities = () => {
  const {short_name} = useParams();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentLang = i18n.language;
  const [pageApi, setPageApi] = useState(1);
  const itemsPerPage = 9;
  const [activitiesCategories, setActivitiesCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [activityTypes, setActivityTypes] = useState([]);
  const [activitiesPost, setActivitiesPost] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchFacultyData = axios.get(
        testUrl + "/api/baseactivity/" + short_name
    );
    
    Promise.all([fetchFacultyData])
        .then(([facultyResponse]) => {
            const faculty = facultyResponse.data;
            if (faculty) {
                setCategory(faculty?.category);
                setActivityTypes(faculty.activity_types || []);
                setActivitiesPost(faculty.activities_post || []);
            } else {
                setError("Ma'lumotlar topilmadi");
            }
        })
        .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
        .finally(() => setLoading(false));
}, [short_name, i18n.language]);

  
  // Pagination logic
  const indexOfLastItem = pageApi * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activitiesPost.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={classes["mainContainer"]}>
      <div data-aos="fade-up" className={classes["container"]}>
        {/* <h1 className={classes["page-title"]}>
            {t("Ilmiy maktablar faoliyati")}
        </h1> */}
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
                count={Math.ceil(currentActivities.length / itemsPerPage)}
                page={pageApi}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.sidebar}>
        <h3>
            {category ? category[`name_${i18n.language}`] : "Error page"}
        </h3>
        <ul>
          {activityTypes.map((cat) => (
            <li
              key={cat.id}
              
              onClick={() => navigate(`/activity/${category.short_name}/${cat.short_name}`)}
            >
              {cat[`name_${currentLang}`]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BaseActivities;
