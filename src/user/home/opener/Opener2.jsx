import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Icon} from "@iconify/react";
import axios from "axios";
import moment from "moment";
import {useNavigate} from "react-router-dom";

// Assets
import arrow from "./assets/icons/arrow.svg";
import announcementImg from "./assets/imgs/bg-img.png";
import classes from "./Opener2.module.css";
import {testUrl} from "../BaseData";

export const Opener2 = () => {
    const {t, i18n} = useTranslation();
    const [newsData, setNews] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNewsData = axios.get(
            testUrl + "/api/newsthree/"
        );

        Promise.all([fetchNewsData])
            .then(([newsResponse]) => {
                const news_data = newsResponse.data || [];

                if (Array.isArray(news_data)) {
                    setNews(news_data);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));

        const fetchAnnouncementsData = axios.get(
            testUrl + "/api/announcementsthree/"
        );

        Promise.all([fetchAnnouncementsData])
            .then(([AnnouncementsResponse]) => {
                const accouncement_data = AnnouncementsResponse?.data || [];

                if (accouncement_data) {
                    setAnnouncements(accouncement_data);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));

    }, [t]);
    useEffect(() => {
        const startScroll = (section) => {
            if (!section) return;

            let scrollPosition = 0;
            let animationFrame;

            const scroll = () => {
                scrollPosition += 0.05;
                if (scrollPosition >= section.scrollHeight - section.clientHeight) {
                    scrollPosition = 0;
                }
                section.scrollTo({top: scrollPosition});
                animationFrame = requestAnimationFrame(scroll);
            };

            const stopScroll = () => {
                if (animationFrame) cancelAnimationFrame(animationFrame);
            };

            animationFrame = requestAnimationFrame(scroll);

            section.addEventListener("mouseenter", stopScroll);
            section.addEventListener("mouseleave", () => {
                animationFrame = requestAnimationFrame(scroll);
            });

            return () => {
                cancelAnimationFrame(animationFrame);
                section.removeEventListener("mouseenter", stopScroll);
                section.removeEventListener("mouseleave", () => {
                    animationFrame = requestAnimationFrame(scroll);
                });
            };
        };

        const newsSection = document.querySelector(`.${classes.newsItems}`);
        const announcementsSection = document.querySelector(
            `.${classes.announcementsSlider}`
        );

        const cleanupNewsScroll = startScroll(newsSection);
        const cleanupAnnouncementsScroll = startScroll(announcementsSection);

        return () => {
            cleanupNewsScroll?.();
            cleanupAnnouncementsScroll?.();
        };
    }, []);

    return (
        <div id="opener" className={classes.wrapper}>
            <div className={classes.mainContainer}>
                {/* Hero Section */}
                <div data-aos="fade-up" className={classes.container}>
                    <h1 className={classes.title}>
                        <span className="span_bluem">
                            {t("openerTitleSpan")}
                        </span>
                    </h1>
                    <p className={classes.descr}>
                        {t("openerDescr")}
                    </p>
                    <div className={classes.flex}>
                        <a href="/contact">
                            <button className={classes.btn1}>
                                {t("startbutton")}
                                <img src={arrow} alt="arrow"/>
                            </button>
                        </a>
                    </div>
                </div>

                {/* News Section */}
                <div className={classes.container2}>

                    <h2 className={classes.newsTitle}>
                        {t("newsTitles")}
                    </h2>

                    <div className={classes.newsSection}>
                        {loading ? (
                            <p>
                                {t("loading")}
                            </p>
                        ) : error ? (
                            <p>
                                {error}
                            </p>
                        ) : (
                            <div
                                onClick={() => navigate("/news")}
                                className={classes.newsItems}>
                                {newsData.map((item) => (
                                    <div key={item.id} className={classes.newsItem}>
                                        <h3>
                                            <span className={classes.icon}>
                                                <Icon icon="mdi:newspaper"/>
                                            </span>
                                            {item[`title_${i18n.language}`] || item.title_uz}
                                        </h3>
                                        <div dangerouslySetInnerHTML={{
                                            __html: item[`full_news_${i18n.language}`],
                                        }}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Announcements Section */}

                    <div className={classes.announcementsSection}>
                        <h2 className={classes.newsTitle}>{t("announcementsTitle")}</h2>
                        <div className={classes.announcementsSlider} draggable="true">
                            {announcements.map((item) => (
                                <div
                                    onClick={() => {
                                        const eventsSection =
                                            document.getElementById("eventsSection");
                                        if (eventsSection) {
                                            eventsSection.scrollIntoView({behavior: "smooth"});
                                        }
                                    }}
                                    key={item.id}
                                    className={classes.announcementItem}
                                >
                                    <img src={item.image || announcementImg} alt={item.title}/>
                                    <p>{item[`title_${i18n.language}`] || item.title_uz}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
