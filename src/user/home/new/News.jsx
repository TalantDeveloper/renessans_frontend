import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./News.module.css";
import styles from "./newsClasses.module.css";
import { testUrl } from "../BaseData";
import {Link} from "react-router-dom";
import search from "../../news/assets/icons/search.svg";
import SocialMedias from "../../../shared/components/socialMedias/SocialMedias";
import "moment/locale/uz-latn";
import moment from "moment";
const NewsPage = () => {
    const navigate = useNavigate();
    const {t, i18n } = useTranslation();
    const [news, setNews] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoriesWithCounts, setCategoriesWithCounts] = useState({});
    console.log(error);

    const calculateCategoryCounts = (data) => {
        const counts = data.reduce((acc, item) => {
            const category = item.category[`name_${i18n.language}`];
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        setCategoriesWithCounts(counts);
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchNewsData = axios.get(
            testUrl + "/api/news2"
        );
        
        Promise.all([fetchNewsData])
            .then(([newsResponse]) => {
                const news = newsResponse.data;
                if (news) {
                    setNews(news?.results || []);
                    calculateCategoryCounts(news);
                    console.log(news);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
            
            const fetchCategoriesData = axios.get(
                testUrl + "/api/categories"
            );
            
            Promise.all([fetchCategoriesData])
                .then(([categoriesResponse]) => {
                    const categories = categoriesResponse.data;
                    if (categories) {
                        setCategories(categories || []);
                        // calculateCategoryCounts(news);
                        console.log(categories);
                    } else {
                        setError("Ma'lumotlar topilmadi");
                    }
                })
                .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
                .finally(() => setLoading(false));
        
    }, [ i18n.language]);
    
    const filteredNews = news ? news.filter((item) => {
        const isCategoryMatch =
            !selectedCategory ||
            item.category[`name_${i18n.language}`] === selectedCategory;
        const isSearchMatch =
            !searchTerm ||
            item[`title_${i18n.language}`]
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
        return isCategoryMatch && isSearchMatch;
    }) : [];

    if (loading) return <p>Yuklanmoqda...</p>;
    
    return (
        
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["newsSection"]}>
            
                <h1 className={classes["page-title"]}>
                </h1>
                
                
                    <div className={styles.facultyList}>
                        {filteredNews.length > 0 ? (
                            filteredNews.map((new_data) => (
                                <Link
                                    key={new_data.id}
                                    to="#"
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={new_data?.image || "/default-image.jpg"}
                                        alt=" "
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>
                                            {new_data?.title_uz}
                                            </h3>
                                    </div>
                                    <div className={styles.newsMetadata}>
                                        <span>
                                        {moment(new_data.posted_time)
                                            .locale(i18n.language)
                                            .format("DD-MMMM, HH:mm")}
                                        </span>
                                        <span>{new_data.view_count} views</span>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>{t("see_more")}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_kafedra_found")}</div>
                        )}
                    </div>
                </div>
                <div className={classes["wrapper"]}>
            <div className={classes["section"]}>
                <h3 className={classes["title"]}>{t("searchLeftBar")}</h3>
                <div className={classes["box"]}>
                    <input
                        placeholder={t("whatSearch")}
                        className={classes["input"]}
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img className={classes["img"]} src={search} alt="search"/>
                </div>
            </div>
            <div className={classes["section"]}>
                <h3 className={classes["title"]}>{t("partsLeftBar")}</h3>
                {loading ? (
                    <p>{t("loading")}</p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className={classes["category_box"]}
                            onClick={() => setSelectedCategory(category.name_uz)}
                        >
                            <p className={classes["category_name"]}>
                                {category[`name_${i18n.language}`]}
                            </p>
                            
                        </div>
                    ))
                )}
            </div>
            <div className={classes["section"]}>
                <h3 className={classes["title"]}>{t("socialMedias")}</h3>
                <SocialMedias/>
            </div>
        </div>
        </div>

    );
};

export default NewsPage;
