import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./CooperationDetail.module.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { testUrl } from "../home/BaseData";
// import Action from "./how-to-start-coding-1.webp";
// import Action2 from "./how-to-start-coding-1.webp";
// Simulated data
// const cooperationData = [ ... ];

const CooperationDetail = () => {
  const { short_name } = useParams();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [partnerships, setPartnerShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLang = i18n.language;

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(testUrl + "/api/partnership/" + short_name)
      .then((response) => {
        setData(response.data.partnership);
        setPartnerShips(response.data.partnerships);
      })
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, [short_name, currentLang]);

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
           {partnerships.map((relatedItem) => (
             <li key={relatedItem.id}>
               <Link
                 to={`/cooperation/${relatedItem.short_name}`}
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
      {/* <div className={classes["related-articles"]}>
        <h3 className={classes["sidebar-title"]}>
          Aloqador
          </h3>
        <ul>
          {cooperationItem.related.map((relatedItem) => (
            <li key={relatedItem.id}>
              <Link
                to={/international-cooperation/${relatedItem.id}}
                className={classes["related-link"]}
              >
                <div className={classes["related-card"]}>
                  <img
                    src={relatedItem.image}
                    alt={relatedItem.title}
                    className={classes["related-image"]}
                  />
                  <div>{relatedItem.title}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
      <div className={classes["article-content"]}>
        <img
          src={data.image.startsWith('http') ? data.image : (testUrl + data.image)}
          alt={data[`name_${currentLang}`]}
          className={classes["article-image"]}
        />
        <h1 className={classes["article-title"]}>{data[`name_${currentLang}`]}</h1>
        <div className={classes["article-body"]} dangerouslySetInnerHTML={{ __html: data[`content_${currentLang}`] }} />
      </div>
    </div>
  );
};

export default CooperationDetail;
