import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./ActivityDetails.module.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { testUrl } from "../BaseData";
// import Action from "./how-to-start-coding-1.webp";
// import Action2 from "./how-to-start-coding-1.webp";
// Simulated data
// const cooperationData = [ ... ];

const ActivityDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLang = i18n.language;

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(testUrl + "/api/activity/1")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, [id, currentLang]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>Maqola topilmadi</div>;

  return (
    <div className={classes["detail-container"]}>
      <div className={classes["article-content"]}>
        <img
          src={data.image && data.image.startsWith('http') ? data.image : (data.image ? testUrl + data.image : '')}
          alt={data[`name_${currentLang}`]}
          className={classes["article-image"]}
        />
        <h1 className={classes["article-title"]}>{data[`name_${currentLang}`]}</h1>
        <div className={classes["article-body"]} dangerouslySetInnerHTML={{ __html: data[`content_${currentLang}`] }} />
      </div>
    </div>
  );
};

export default ActivityDetail;
