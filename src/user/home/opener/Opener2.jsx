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
import {BaseURL} from "../BaseData";

export const Opener2 = () => {
    const {t, i18n} = useTranslation();
    const [news, setNews] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    BaseURL + "api/news/"
                );
                const filteredNews = response.data
                    .filter((item) => item.is_main)
                    .sort((a, b) =>
                        moment(b.posted_time).isAfter(moment(a.posted_time)) ? 1 : -1
                    );
                setNews(filteredNews.slice(0, 3));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(t("errorFetchingNews"));
                setLoading(false);
            }
        };

        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(
                    BaseURL + "api/announcement/"
                );
                const filteredAnnouncements = response.data.filter(
                    (item) =>
                        item.is_main && moment(item.finishing_time).isAfter(moment())
                );
                setAnnouncements(filteredAnnouncements);
            } catch (err) {
                console.error("Error fetching announcements:", err);
                setError(t("errorFetchingAnnouncements"));
            }
        };

        fetchNews();
        fetchAnnouncements();
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
                        <span className="span_bluem">{t("openerTitleSpan")}</span>
                    </h1>
                    <p className={classes.descr}>{t("openerDescr")}</p>
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

                    <h2 className={classes.newsTitle}>{t("newsTitles")}</h2>

                    <div className={classes.newsSection}>
                        {loading ? (
                            <p>{t("loading")}</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div
                                onClick={() => navigate("/news")}
                                className={classes.newsItems}>
                                {news.slice(0, 5).map((item) => (
                                    <div key={item.id} className={classes.newsItem}>
                                        <h3>
                      <span className={classes.icon}>
                        <Icon icon="mdi:newspaper"/>
                      </span>
                                            {item[`title_${i18n.language}`] || item.title_uz}
                                        </h3>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    item[`full_news_${i18n.language}`] ||
                                                    item.full_news_uz,
                                            }}
                                        />
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
