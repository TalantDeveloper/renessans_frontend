import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AiOutlineEye} from "react-icons/ai";
import SocialMedias from "../../../shared/components/socialMedias/SocialMedias";
import {FaLongArrowAltRight} from "react-icons/fa";
import axios from "axios";
import {testUrl} from "../BaseData";

// assets
import classes from "./NewsSection.module.css";

export const NewsSection = () => {
    const {t, i18n} = useTranslation(); // Access i18n for language management
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Fetch news data from the API
    useEffect(() => {
        const fetchNewsData = axios.get(
            testUrl + "/api/newsfour/"
        );

        Promise.all([fetchNewsData])
            .then(([newsResponse]) => {
                const news_data = newsResponse.data;

                if (news_data) {
                    setNews(news_data || []);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [t]);

    // Function to get the title based on the current language
    const getNewsTitle = (item) => {
        const lang = i18n.language; // Get current language (e.g., 'en', 'uz', 'ru')
        switch (lang) {
            case "en":
                return item.title_en;
            case "uz":
                return item.title_uz;
            case "ru":
                return item.title_ru;
            default:
                return item.title_uz; // Fallback to English if the language is unknown
        }
    };
    return (
        <section id="news_section" className={classes["containers"]}>
            <div className={classes["text-center"]}>
                <h1 className={classes["title"]}>{t(`newsTitle`)} </h1>
            </div>

            <div className={classes["allNews"]}>
                <div
                    data-aos-anchor-placement="bottom-bottom"
                    className={classes["right-side"]}>
                    {news.length > 0 && (
                        <div
                            onClick={() => navigate("/news/" + news[0].id)}
                            className={classes["nmadur3"]}>
                            <img className={classes["image3"]} src={news[0].image} alt=""/>
                            <div className={classes["blanket"]}>
                                <div className={classes["flex"]}>
                                    <h1>
                                        {getNewsTitle(news[0])}
                                    </h1>{" "}
                                    <p>
                                        <AiOutlineEye style={{marginRight: "5px"}}/>
                                        {news[0]?.view_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={classes["second-sidebar"]}>
                    <div className={classes["section"]}>
                        <div className={classes["nav"]}>
                            <p onClick={() => navigate("/news")}>
                                {t("allNews")}
                                <FaLongArrowAltRight className={classes["icon"]}/>
                            </p>
                        </div>

                        {news.slice(1, 4).map((item, index) => (
                            <div key={index} className={classes["category_box"]}>
                                <img src={item.image} alt=""/>
                                <div className={classes["category_event"]}>
                                    <h2>{getNewsTitle(item)}</h2>{" "}
                                    {/* Use dynamic title based on language */}
                                    <p>{new Date(item.posted_time).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{marginTop: "-30px"}} className={classes["section"]}>
                        <h5>{t("followUsOnSocial")}</h5>
                        <div className={classes["socialMedias"]}>
                            <SocialMedias/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
