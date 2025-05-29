import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../BaseData";
// assets
import classes from "./NewsSection.module.css";

// Fetch news data from API
const newsApiUrl = BaseURL + "api/news/";

const fetchNewsData = async () => {
  try {
    const response = await fetch(newsApiUrl);
    const data = await response.json();
    return data
      .filter((news) => news.is_main)
      .sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time));
  } catch (error) {
    console.error("Error fetching news data:", error);
    return [];
  }
};

export const NewsSection = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchAndSetNews = async () => {
      const fetchedNews = await fetchNewsData();
      setNewsItems(fetchedNews.slice(0, 3)); // Get the top 3 latest news
    };

    fetchAndSetNews();
  }, []);

  return (
    <section id="news_section" className={classes["containers"]}>
      <div className={classes["text-center"]}>
        <h1 className={classes["title"]}>
          Ommaviy axborot vositalarida biz haqimizda ko‘proq o‘qing
        </h1>
        <p className={classes["section-word"]}>
          Eng so‘nggi yangiliklarni o‘qing va bizning jamoamiz haqida ma’lumot
          oling.
        </p>
        <button onClick={() => navigate("/news")} className={classes["button"]}>
          Barcha yangiliklar
        </button>
      </div>

      <div className={classes["first-news"]}>
        <div className={classes["left-side"]}>
          {newsItems.slice(0, 2).map((news, index) => (
            <div
              key={news.id}
              onClick={() => navigate(`/news`)}
              className={`${classes["nmadur"]} ${
                index === 1 ? classes["nmadur2"] : ""
              }`}
            >
              <img
                className={classes["image"]}
                src={news.image}
                alt={news.title_uz}
              />
              <div className={classes["blanket"]}>
                <div className={classes["flex"]}>
                  <h1>{news.title_uz}</h1> {/* Display only title_uz */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes["right-side"]}>
          <div onClick={() => navigate(`/news`)} className={classes["nmadur3"]}>
            <img
              className={classes["image3"]}
              src={newsItems[2]?.image || "default-image.jpg"}
              alt={newsItems[2]?.title_uz || "Default news title"}
            />
            <div className={classes["blanket"]}>
              <div className={classes["flex"]}>
                <h1>{newsItems[2]?.title_uz}</h1>{" "}
                {/* Display the third news' title_uz */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
