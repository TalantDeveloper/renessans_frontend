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
import "moment/locale/uz-latn";
import moment from "moment";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Pagination from "@mui/material/Pagination";

const NewsPage = () => {
    const [pageApi, setPageApi] = useState(1);
    const navigate = useNavigate();
    const {t, i18n } = useTranslation();
    const [news_data, setNews] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchNewsData = axios.get(
            testUrl + "/api/news"
        );
        
        const fetchCategoriesData = axios.get(
            testUrl + "/api/categories"
        );
        
        Promise.all([fetchNewsData, fetchCategoriesData])
            .then(([newsResponse, categoriesResponse]) => {
                const news = newsResponse.data;
                const categorie = categoriesResponse.data;
                
                if (news && categorie) {
                    setNews(news || []);
                    setCategories(categorie);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }       
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
        
    }, [ i18n.language]);
    console.log(news_data);
    console.log(news_data?.length || 0);
    
    const length = news_data?.length || 0;
    console.log(length);
  

    if (loading) return <p>Yuklanmoqda...</p>;

    const itemsPerPage = 1;
    const indexOfLastItem = pageApi * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    return (
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["newsSection"]}>
                <h1 className={classes["page-title"]}>
                    Yangiliklar
                </h1>
                <div className={styles.facultyList}>
                    {news_data.length > 0 ? (
                        news_data.map((new_data) => (
                            <Link
                                key={new_data.id}
                                to={`/news/${new_data.id}`}
                                className={styles.facultyCard}>
                                    <img
                                        src={new_data?.image || "/default-image.jpg"}
                                        alt=" "
                                        className={styles.facultyImage}/>
                                    <div className={styles.facultyInfo}>
                                        <h3>
                                            {new_data?.title_uz}
                                        </h3>
                                    </div>
                                    <div className={styles.newsMeta}>
                                        <span className={styles.newsDate}>
                                            {moment(new_data.posted_time)
                                                .locale(i18n.language)
                                                .format("DD-MMMM, HH:mm")}
                                        </span>
                                        <span className={styles.newsViews}>
                                            <InlineIcon icon="mdi:eye"/>
                                            {new_data.view_count} views
                                        </span>
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
                <div className={classes["center_div"]}>
                    <Pagination
                        onChange={(e, value) => setPageApi(value)}
                        count={Math.ceil(news_data.length / itemsPerPage)}
                        variant="outlined"
                        shape="rounded"
                    />
            </div>
            </div>
            <div className={classes.sidebar} style={{marginLeft: 0, marginRight: "40px"}}>
                <h3>
                    {t("categories")}
                </h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <li
                                onClick={() => navigate(`/newscategories/${category.id}`)}
                                key={category.id}
                                style={{marginBottom: '10px'}}
                            >
                                <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                <span
                                    style={{cursor: 'pointer', color: '#133654'}}
                                >
                                    {category[`name_${i18n.language}`]}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>{t("no_departments_found")}</li>
                    )}
                </ul>
            </div>

            {/* <div className={classes["wrapper"]}> */}
                {/* <div className={classes["section"]}>
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
                </div> */}
                {/* <div className={classes["section"]}>
                    <h3 className={classes["title"]}>
                        {t("partsLeftBar")}
                    </h3>
                    {loading ? (
                        <p>{t("loading")}</p>
                    ) : categories ? (
                        categories.map((category, index) => (
                            <Link key={categories.id}
                                to={`/news/categories/${category.id}`}
                                className={styles.facultyCard}>
                                <div className={styles.facultyInfo}>
                                    <h3>{index + 1}. {category[`name_${i18n.language}`]}</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>{t("no_categories_found")}</p>
                    )}
                </div> */}
                {/* <div className={classes["section"]}>
                    <h3 className={classes["title"]}>{t("socialMedias")}</h3>
                    <SocialMedias/>
                </div> */}
            {/* </div> */}
        </div>

    );
};

export default NewsPage;
