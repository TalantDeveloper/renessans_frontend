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
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLang = i18n.language;

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(testUrl + "/api/activity/" + id)
      .then((response) => {
        setData(response.data.activity);
        setActivities(response.data.activities);
      })
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
      .finally(() => setLoading(false));
      console.log(activities);
  }, [id, currentLang]);

  console.log(activities)


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>Maqola topilmadi</div>;

  return (
    <div className={classes["detail-container"]}>           
            <div className={classes["related-articles"]}>
          <h3 className={classes["sidebar-title"]}>
            {t("Aloqador")}
          </h3>
          <ul> 
           {activities.map((relatedItem) => (
             <li key={relatedItem.id}>
               <Link
                 to={`/activity/${relatedItem.id}`}
                 className={classes["related-link"]}
               >
                 <div className={classes["related-card"]}>
                   <img
                     src={relatedItem.image}
                     alt={relatedItem[`name_${i18n.language}`]}
                     className={classes["related-image"]}
                   />
                   <div>{relatedItem[`name_${i18n.language}`]}</div>
                 </div>
               </Link>
             </li>
           ))}
          </ul>
      </div>
      <div className={classes["article-content"]}>
      <h1 className={classes["article-title"]}>{data[`name_${currentLang}`]}</h1>
        
        <div className={classes["article-body"]} dangerouslySetInnerHTML={{ __html: data[`content_${currentLang}`] }} />
      </div>
    </div>
  );
};

export default ActivityDetail;
