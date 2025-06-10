import React from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./CooperationDetail.module.css";
import Action from "./how-to-start-coding-1.webp";
import Action2 from "./how-to-start-coding-1.webp";

// Simulated data
const cooperationData = [
  {
    id: 1,
    image: Action2,
    title:
      "Sun’y intellektni rivojlantirish bo‘yicha Tayvan bilan kelishuvga erishildi",
    content:
      "Tayvanning 'Nuwa Robotics' kompaniyasi bilan kelishuv tafsilotlari...",
    related: [
      {
        id: 2,
        title:
          "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum",
        image: Action,
      },
      {
        id: 3,
        title: "Koreya aerokosmik universiteti bilan hamkorlik o‘rnatildi",
        image: Action2,
      },
    ],
  },
  {
    id: 2,
    image: Action,
    title:
      "Sun’y intellektni rivojlantirish bo‘yicha Tayvan bilan kelishuvga erishildi",
    content:
      "Tayvanning 'Nuwa Robotics' kompaniyasi bilan kelishuv tafsilotlari...",
    related: [
      {
        id: 5,
        title:
          "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum",
        image: Action,
      },
      {
        id: 6,
        title: "Koreya aerokosmik universiteti bilan hamkorlik o‘rnatildi",
        image: Action2,
      },
    ],
  },
  {
    id: 3,
    image: Action,
    title:
      "Sun’y intellektni rivojlantirish bo‘yicha Tayvan bilan kelishuvga erishildi",
    content:
      "Tayvanning 'Nuwa Robotics' kompaniyasi bilan kelishuv tafsilotlari...",
    related: [
      {
        id: 5,
        title:
          "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum",
        image: Action,
      },
      {
        id: 6,
        title: "Koreya aerokosmik universiteti bilan hamkorlik o‘rnatildi",
        image: Action2,
      },
    ],
  },
  {
    id: 4,
    image: Action2,
    title:
      "Sun’y intellektni rivojlantirish bo‘yicha Tayvan bilan kelishuvga erishildi",
    content:
      "Tayvanning 'Nuwa Robotics' kompaniyasi bilan kelishuv tafsilotlari...",
    related: [
      {
        id: 5,
        title:
          "Startap loyihalarni rivojlantirish bo‘yicha Xitoy bilan memorandum",
        image: Action,
      },
      {
        id: 6,
        title: "Koreya aerokosmik universiteti bilan hamkorlik o‘rnatildi",
        image: Action2,
      },
    ],
  },
];

const CooperationDetail = () => {
  const { id } = useParams();
  const cooperationItem = cooperationData.find(
    (item) => item.id === parseInt(id)
  );

  if (!cooperationItem) {
    return <p>Maqola topilmadi</p>;
  }

  return (
    <div className={classes["detail-container"]}>
      <div className={classes["related-articles"]}>
        <h3 className={classes["sidebar-title"]}>
          Aloqador
          </h3>
        <ul>
          {cooperationItem.related.map((relatedItem) => (
            <li key={relatedItem.id}>
              <Link
                to={`/international-cooperation/${relatedItem.id}`}
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
      </div>

      {/* Main article content */}
      <div className={classes["article-content"]}>
        <img
          src={cooperationItem.image}
          alt={cooperationItem.title}
          className={classes["article-image"]}
        />
        <h1 className={classes["article-title"]}>{cooperationItem.title}</h1>
        <p className={classes["article-body"]}>{cooperationItem.content}</p>
      </div>
    </div>
  );
};

export default CooperationDetail;
